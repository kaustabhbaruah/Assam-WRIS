import pg from "pg";

/**
 * PostgreSQL Database Provider
 * 
 * Manages the connection pool for the entire application.
 * Utilizes lazy initialization to avoid overhead during static builds.
 */

let pool: pg.Pool | null = null;

/**
 * Singleton pattern to retrieve the Database Pool.
 * In production environments, this ensures we don't open too many concurrent connections.
 */
export const getPool = () => {
  if (!pool) {
    if (!process.env.DB_HOST) {
      // Return null if environment variables aren't set yet (typical during initial dev setup)
      return null;
    }

    pool = new pg.Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      max: 20, // Industry standard: Cap maximum concurrent clients
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
    
    pool.on('error', (err) => {
      console.error('CRITICAL: PostgreSQL pool error', err);
    });
  }
  return pool;
};
