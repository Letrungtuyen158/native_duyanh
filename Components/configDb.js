import * as SQLite from "expo-sqlite";

export const Connection_db = {
  getDb_Trip: () => SQLite.openDatabase("dbName", 1.0),
};

