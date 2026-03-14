import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import serviceAccount from "../../assignment-4-e2035-firebase-adminsdk-fbsvc-5ddb334be0.json"; // new import

/**
 * Initialize Firebase Admin SDK
 * 
 * This sets up Firebase with admin privileges using a service account key.
 * It allows the backend to interact with Firebase Auth and Firestore securely.
 */
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

/**
 * Firebase Authentication instance
 * 
 * Used to manage users, generate and verify ID tokens, and handle authentication-related tasks.
 */
const auth: Auth = getAuth();

/**
 * Firestore database instance
 * 
 * Used to read and write documents, collections, and perform queries on Firestore.
 */
const db: Firestore = getFirestore();

export { auth, db };