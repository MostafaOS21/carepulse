import * as sdk from "node-appwrite";

export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID;
export const PATIENT_COLLECTION_ID =
  process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID;
export const DOCTOR_COLLECTION_ID =
  process.env.NEXT_PUBLIC_DOCTOR_COLLECTION_ID;
export const APPOINTMENT_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID;
export const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID;
export const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;

console.log({
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  BUCKET_ID,
  ENDPOINT,
});

const client = new sdk.Client();

client.setProject(PROJECT_ID!).setKey(API_KEY!).setEndpoint(ENDPOINT!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const functions = new sdk.Functions(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
