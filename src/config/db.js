// import pg from "pg";
// import { env } from "./env.js";

// const { Pool } = pg;

// export const pool = new Pool({
//   connectionString: env.DATABASE_URL,
//   ssl: env.DB_SSL ? { rejectUnauthorized: false } : false,
//   max: 10,
//   idleTimeoutMillis: 30_000,
//   connectionTimeoutMillis: 5_000
// });

// pool.on("error", (error) => {
//   console.error("Unexpected PostgreSQL pool error:", error);
// });

// export async function query(text, params = []) {
//   return pool.query(text, params);
// }

import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export default pool;