import { type SQLiteDatabase } from 'expo-sqlite';

export default async function migrate(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  // @ts-ignore
  let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY NOT NULL,
        category_name VARCHAR(100) NOT NULL,
        icon_path TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY NOT NULL,
        product_name VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        extra_info TEXT NOT NULL,
        stocks INTEGER,
        category_id INTEGER NOT NULL,
        price DOUBLE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY NOT NULL,
        total DOUBLE NOT NULL,
        payment_method VARCHAR(100) NOT NULL,
        payment_amount DOUBLE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS transaction_details (
        transaction_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        unit_price DOUBLE NOT NULL,
        total_price DOUBLE NOT NULL,
        quantity INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    currentDbVersion = 1;
  }

  if (currentDbVersion === 1) {
    currentDbVersion = 2;
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}