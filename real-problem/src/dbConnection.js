import { MongoClient } from 'mongodb';

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let db;

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("currencyDB");
    return db;
  } catch (error) {
    console.error("DB Error", error);
    throw error;
  }
}

export function getDb() {
  if (!db) {
    throw new Error("Database not connected.");
  }
  return db;
}

export function closeConnection() {
  return client.close();
}