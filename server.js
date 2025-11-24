require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');

const db = require('./lib/db');
const players = require('./data/players');
const { buildTeamPdf } = require('./lib/pdf');
const { sendTeamEmail } = require('./lib/email');
const { hydratePlayerPhotos } = require('./lib/photos');

const TEAM_BUDGET = 100; // £100m budget

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
};

if (process.env.DATABASE_URL) {
  const pgSession = require('connect-pg-simple')(session);
  const { Pool } = require('pg');
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
  });
  sessionConfig.store = new pgSession({
    pool: pool,
    tableName: 'session'
  });
}

app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.teamBudget = TEAM_BUDGET;
  res.locals.flash = req.session.flash || null;
  delete req.session.flash;
  next();
});

const dbRun = async (sql, params = []) => {
  if (db.query) {
    const result = await db.run(sql, params);
    return result;
  } else {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function onRun(err) {
        if (err) return reject(err);
        resolve(this);
      });
    });
  }
};

const dbGet = async (sql, params = []) => {
  if (db.query) {
    return await db.get(sql, params);
  } else {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }
};

async function loadUser(userId) {
  if (!userId) return null;
  return dbGet('SELECT id, name, email FROM users WHERE id = ?', [userId]);
}

async function loadTeam(userId) {
  if (!userId) return null;
  const team = await dbGet('SELECT * FROM teams WHERE user_id = ?', [userId]);
  if (!team) return null;
  return {
    ...team,
    total_value: Number(team.total_value),
    players: JSON.parse(team.players_json)
  };
}

function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  return next();
}

function sanitizePlayerSelection(rawSelection) {
  if (!rawSelection) return [];
  const selection = Array.isArray(rawSelection) ? rawSelection : [rawSelection];
  const unique = [...new Set(selection.map(String))];
  return unique.filter((id) => players.some((p) => p.id === id));
}

function buildSelectedPlayers(playerIds) {
  return playerIds
    .map((id) => players.find((p) => p.id === id))
    .filter(Boolean);
}

app.get('/', async (req, res) => {
  const user = await loadUser(req.session.userId);
  const team = user ? await loadTeam(user.id) : null;
  res.render('index', { user, team, players, budget: TEAM_BUDGET });
});

app.get('/register', (req, res) => {
  if (req.session.userId) return res.redirect('/dashboard');
  res.render('register', { error: null, form: {} });
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const form = { name, email };

  if (!name || !email || !password) {
    return res.render('register', { error: 'All fields are required.', form });
  }

  const existing = await dbGet('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
  if (existing) {
    return res.render('register', { error: 'Email already registered.', form });
  }

  const hash = await bcrypt.hash(password, 10);
  const result = await dbRun(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [name.trim(), email.toLowerCase(), hash]
  );

  req.session.userId = result.lastID;
  req.session.user = { id: result.lastID, name: name.trim(), email: email.toLowerCase() };
  res.redirect('/dashboard');
});

app.get('/login', (req, res) => {
  if (req.session.userId) return res.redirect('/dashboard');
  res.render('login', { error: null, form: {} });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const form = { email };
  if (!email || !password) {
    return res.render('login', { error: 'Email and password required.', form });
  }

  const user = await dbGet('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);
  if (!user) {
    return res.render('login', { error: 'Invalid credentials.', form });
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    return res.render('login', { error: 'Invalid credentials.', form });
  }

  req.session.userId = user.id;
  req.session.user = { id: user.id, name: user.name, email: user.email };
  res.redirect('/dashboard');
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.get('/dashboard', requireAuth, async (req, res) => {
  const user = await loadUser(req.session.userId);
  const team = await loadTeam(user.id);
  let selectedPlayers = [];
  if (team) {
    selectedPlayers = buildSelectedPlayers(team.players);
  }
  res.render('dashboard', { user, team, selectedPlayers, players, budget: TEAM_BUDGET });
});

app.get('/team-builder', requireAuth, async (req, res) => {
  const user = await loadUser(req.session.userId);
  const team = await loadTeam(user.id);
  const selectedIds = team ? team.players : [];
  res.render('team-builder', {
    user,
    players,
    selectedIds,
    teamName: team ? team.team_name : `${user.name.split(' ')[0]}'s XI`,
    budget: TEAM_BUDGET,
    error: null
  });
});

app.post('/team-builder', requireAuth, async (req, res) => {
  const user = await loadUser(req.session.userId);
  const teamName = (req.body.teamName || '').trim();
  const playerIds = sanitizePlayerSelection(req.body.playerIds);

  const renderError = (message) =>
    res.render('team-builder', {
      user,
      players,
      selectedIds: playerIds,
      teamName: teamName || `${user.name.split(' ')[0]}'s XI`,
      budget: TEAM_BUDGET,
      error: message
    });

  if (!teamName) {
    return renderError('Please provide a team name.');
  }

  if (playerIds.length !== 11) {
    return renderError('You must pick exactly 11 players.');
  }

  const selectedPlayers = buildSelectedPlayers(playerIds);
  const totalValue = selectedPlayers.reduce((sum, player) => sum + player.value, 0);
  if (totalValue > TEAM_BUDGET) {
    return renderError(`Squad exceeds £${TEAM_BUDGET}m budget.`);
  }

  const goalkeepers = selectedPlayers.filter((player) => player.position === 'GK');
  if (goalkeepers.length === 0) {
    return renderError('Select exactly one goalkeeper.');
  }
  if (goalkeepers.length > 1) {
    return renderError('You can only select one goalkeeper.');
  }

  const existing = await loadTeam(user.id);
  if (existing) {
    await dbRun(
      `
      UPDATE teams
      SET team_name = ?, players_json = ?, total_value = ?, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ?
    `,
      [teamName, JSON.stringify(playerIds), totalValue, user.id]
    );
  } else {
    await dbRun(
      `
      INSERT INTO teams (user_id, team_name, players_json, total_value)
      VALUES (?, ?, ?, ?)
    `,
      [user.id, teamName, JSON.stringify(playerIds), totalValue]
    );
  }

  res.redirect('/dashboard');
});

app.get('/team/pdf', requireAuth, async (req, res) => {
  const user = await loadUser(req.session.userId);
  const team = await loadTeam(user.id);
  if (!team) {
    return res.redirect('/team-builder');
  }
  const selectedPlayers = buildSelectedPlayers(team.players);
  const pdfBuffer = await buildTeamPdf({ user, team, players: selectedPlayers });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${team.team_name.replace(/\s+/g, '_')}.pdf"`
  );
  res.send(pdfBuffer);
});

app.post('/team/email', requireAuth, async (req, res) => {
  const user = await loadUser(req.session.userId);
  const team = await loadTeam(user.id);
  if (!team) return res.redirect('/team-builder');

  const email = (req.body.email || user.email || '').trim();
  if (!email) {
    return res.redirect('/dashboard');
  }

  const selectedPlayers = buildSelectedPlayers(team.players);
  const pdfBuffer = await buildTeamPdf({ user, team, players: selectedPlayers });
  try {
    const { previewUrl } = await sendTeamEmail({
      recipient: email,
      pdfBuffer,
      teamName: team.team_name
    });
    req.session.flash = {
      message: previewUrl
        ? `Email sent! Preview it here: ${previewUrl}`
        : 'Email sent successfully.'
    };
  } catch (err) {
    console.error(err);
    req.session.flash = { message: 'Unable to send email. Check SMTP settings.' };
  }

  res.redirect('/dashboard');
});

app.use((req, res) => {
  res.status(404).render('404', { user: res.locals.currentUser });
});

async function startServer() {
  try {
    await hydratePlayerPhotos(players);
  } catch (err) {
    console.warn('Player photos could not be hydrated. Using placeholders.', err.message);
  }
  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || '0.0.0.0';
  app.listen(PORT, HOST, () => {
    console.log(`Fantasy league server running on http://${HOST}:${PORT}`);
  });
}

startServer();

