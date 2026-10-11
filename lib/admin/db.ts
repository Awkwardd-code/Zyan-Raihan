import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function getDatabase() {
  const client = await clientPromise;

  if (!client) {
    throw new Error("MongoDB client is not configured.");
  }

  return client.db(process.env.MONGODB_DB || "portfolio");
}

export async function getCollection(name: string) {
  const db = await getDatabase();
  return db.collection(name);
}

export async function listCollection<T>(name: string, sort: Record<string, 1 | -1> = { _id: -1 }) {
  const collection = await getCollection(name);
  return (await collection.find({}).sort(sort).toArray()) as T[];
}

export function parseObjectId(id: string) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return new ObjectId(id);
}
