import * as FileSystem from "expo-file-system";

export const initializeDatabase = async () => {
  console.log("Initializing database...");
};

export function getDatabasePath(databaseName: string = "littleLemon.db") {
  return `${FileSystem.Paths.document.uri}SQLite`;
}