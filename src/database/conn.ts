import { config } from 'dotenv';
import pg from 'pg';
config();

const pool = new pg.Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: 'Todo',
  password: process.env.DATABASE_AUTH,
  port: 5432,
});

export default pool;
