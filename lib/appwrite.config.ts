import * as sdk from "node-appwrite";

export const {
	PROJECT_ID,
	APPWRITE_API_KEY,
	DATSBASE_ID,
	PATIENT_COLLECTION_ID,
	DOCTOR_COLLECTION_ID,
	APPOINTMENT_COLLECTION_ID,
	NEXT_PUBLIC_APPWRITE_DB_STORAGE_BUCKET_ID,
	NEXT_PUBLIC_ENDPOINT,
} = process.env;

const client = new sdk.Client();

client
	.setEndpoint(NEXT_PUBLIC_ENDPOINT!)
	.setProject(PROJECT_ID!)
	.setKey(APPWRITE_API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
