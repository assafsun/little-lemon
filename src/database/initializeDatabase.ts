import * as SQLite from "expo-sqlite";

export const initializeDatabase = async (db: SQLite.SQLiteDatabase) => {
  console.log("Initializing database...");
  try {
    await db.execAsync(
      "create table if not exists menuitems (id integer primary key not null, title text, price text, description text, image text, category text);"
    );
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};