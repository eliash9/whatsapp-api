const { query } = require('express-validator');
const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://kttwourrbkwrcb:1f0c903d312ded5b94fba44abaead4b3c70f9fbc3a756ff9e7b9afa65cc74aa9@ec2-34-233-64-238.compute-1.amazonaws.com:5432/d3rf92mldag7hn",//process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const readSession = async () => {
  try {
    const res = await client.query('SELECT * FROM wa_sessions ORDER BY created_at DESC LIMIT 1');
    if (res.rows.length) return res.rows[0].session;
    return '';
  } catch (err) {
    throw err;
  }
}

const saveSession = (session) => {
  client.query('INSERT INTO wa_sessions (session) VALUES($1)', [session], (err, results) => {
    if (err) {
      console.error('Failed to save session!', err);
    } else {
      console.log('Session saved!');
    }
  });
}

const removeSession = () => {
  client.query('DELETE FROM wa_sessions', (err, results) => {
    if (err) {
      console.error('Failed to remove session!', err);
    } else {
      console.log('Session deleted!');
    }
  });
}

module.exports = {
  readSession,
  saveSession,
  removeSession
}
