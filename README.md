## Fantasy Scottish League

Draft a custom fantasy football (soccer) XI made exclusively of Scotland’s greatest players since 1980. Users can register, log in, pick 11 players under a fixed budget, download a printable A4 PDF squad sheet, or email it to themselves.

### Tech stack
- Node.js + Express (server-rendered EJS views)
- SQLite (development) / PostgreSQL (production) for persistence
- Sessions + bcrypt for authentication
- PDFKit for A4 exports, Nodemailer for outbound email

### Getting started
```bash
npm install
npm run dev   # starts nodemon on http://localhost:3000
```

Create a `.env` file (see `env.example`) to configure secrets:
```
SESSION_SECRET=choose-a-secret
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=super-secret
SMTP_SECURE=false
MAIL_FROM="Fantasy Scottish League <fantasy@example.com>"
```

If SMTP settings are omitted the app falls back to a Nodemailer test account and returns a preview URL instead of sending a real email.

### Features
- User registration and login with hashed passwords
- Curated pool of famous Scottish players (GK/DF/MF/FW) with public-source photos, stats, and purchase values
- Budget-aware team builder that enforces a full XI and at least one goalkeeper
- Dashboard showing squad value, player stats, and PDF/email actions
- Printable A4 PDF output plus self-email delivery
- Player imagery is hydrated automatically from Wikipedia/Wikidata (falls back to a built-in placeholder when no freely licensed photo exists)

### Deployment to Render

1. **Push your code to GitHub**

2. **Create a new Web Service on Render:**
   - Connect your GitHub repository
   - Render will auto-detect Node.js
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Create a PostgreSQL database:**
   - In Render dashboard, create a new PostgreSQL database
   - Render will automatically set the `DATABASE_URL` environment variable

4. **Set environment variables:**
   - `SESSION_SECRET`: Generate a strong random secret
   - `NODE_ENV`: Set to `production`
   - `DATABASE_URL`: Automatically set by Render (don't set manually)
   - Email settings (optional): Configure SMTP if you want real emails

5. **Deploy:**
   - Render will automatically deploy on every push to your main branch
   - The app will use PostgreSQL in production and SQLite locally

**Note:** The app automatically detects the database type based on the `DATABASE_URL` environment variable. If present, it uses PostgreSQL; otherwise, it falls back to SQLite for local development.

### Development notes
- Player data lives in `data/players.js`. Extend it to add more stars or update valuations.
- Database tables (`users`, `teams`, `session`) are auto-created on server start.
- Update styling in `public/css/styles.css` and interactivity in `public/js/team-builder.js`.
- Player photos are sourced from Scottish FA website.

