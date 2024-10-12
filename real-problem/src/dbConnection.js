import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const uri = process.env.URI;

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