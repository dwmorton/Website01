const path = require('path');

let db = null;
let dbType = null;

function initDatabase() {
  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl) {
    dbType = 'postgres';
    const { Pool } = require('pg');
    const pool = new Pool({
      connectionString: databaseUrl,
      ssl: databaseUrl.includes('localhost') ? false : { rejectUnauthorized: false }
    });

    function convertParams(sql, params) {
      let paramIndex = 1;
      const convertedSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
      return { sql: convertedSql, params };
    }

    db = {
      query: (text, params) => {
        const { sql, params: convertedParams } = convertParams(text, params || []);
        return pool.query(sql, convertedParams);
      },
      run: async (text, params) => {
        let { sql, params: convertedParams } = convertParams(text, params || []);
        if (sql.trim().toUpperCase().startsWith('INSERT')) {
          sql = sql.replace(/;?\s*$/, '') + ' RETURNING id';
        }
        const result = await pool.query(sql, convertedParams);
        return {
          lastID: result.rows[0]?.id || null,
          changes: result.rowCount || 0
        };
      },
      get: async (text, params) => {
        const { sql, params: convertedParams } = convertParams(text, params || []);
        const result = await pool.query(sql, convertedParams);
        return result.rows[0] || null;
      },
      all: async (text, params) => {
        const { sql, params: convertedParams } = convertParams(text, params || []);
        const result = await pool.query(sql, convertedParams);
        return result.rows || [];
      }
    };

    // Initialize tables asynchronously (non-blocking)
    initPostgresTables(pool).catch(err => {
      console.error('Failed to initialize PostgreSQL tables:', err);
    });
  } else {
    dbType = 'sqlite';
    const sqlite3 = require('sqlite3').verbose();
    const dbPath = path.join(__dirname, '..', 'data', 'fantasy.db');
    db = new sqlite3.Database(dbPath);

    db.serialize(() => {
      db.run(
        `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `
      );

      db.run(
        `
        CREATE TABLE IF NOT EXISTS teams (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL UNIQUE,
          team_name TEXT NOT NULL,
          players_json TEXT NOT NULL,
          total_value REAL NOT NULL,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `
      );
    });
  }
}

async function initPostgresTables(pool) {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS teams (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL UNIQUE,
        team_name TEXT NOT NULL,
        players_json TEXT NOT NULL,
        total_value REAL NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS session (
        sid VARCHAR NOT NULL PRIMARY KEY,
        sess JSON NOT NULL,
        expire TIMESTAMP(6) NOT NULL
      )
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS IDX_session_expire ON session(expire)
    `);
  } catch (err) {
    console.error('Error initializing PostgreSQL tables:', err);
  }
}

initDatabase();

module.exports = db;
