import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URL;

let client;
let clientPromise;

if (!url) {
  throw new Error("Missing environment variable: 'MONGODB_URL'");
}

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(url);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(url);
  clientPromise = client.connect();
}

export default clientPromise as Promise<MongoClient>;
