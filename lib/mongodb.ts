import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.warn("MONGODB_URI is not defined. MongoDB features are disabled.");
}

const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const client = uri ? new MongoClient(uri) : null;
const clientPromise = client
  ? globalWithMongo._mongoClientPromise ?? (globalWithMongo._mongoClientPromise = client.connect())
  : null;

export default clientPromise;
