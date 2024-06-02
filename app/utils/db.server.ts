import admin from 'firebase-admin'
import {
  applicationDefault,
  initializeApp as initializeAdminApp,
  App as AdminApp
} from 'firebase-admin/app'
import { initializeApp, FirebaseApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import 'dotenv/config'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.FIREBASE_PROJECT_ID!,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.FIREBASE_APP_ID!
}

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  initializeAdminApp({
    credential: applicationDefault(),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  })
}

const db = admin.firestore()
const adminAuth = admin.auth()

// Initialize Firebase Client SDK
let firebaseClientApp: FirebaseApp | null = null

if (!firebaseClientApp) {
  firebaseClientApp = initializeApp(firebaseConfig)
}

async function signIn(email: string, password: string) {
  const auth = getAuth()
  return signInWithEmailAndPassword(auth, email, password)
}

async function signUpWithEmailAndPassword(email: string, password: string) {
  if (!firebaseClientApp) {
    throw new Error('Firebase client app has not been initialized.')
  }
  const auth = getAuth(firebaseClientApp)
  return createUserWithEmailAndPassword(auth, email, password)
}

async function getSessionToken(idToken: string) {
  const decodedToken = await adminAuth.verifyIdToken(idToken)
  if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
    throw new Error('Recent sign in required')
  }
  const twoWeeks = 60 * 60 * 24 * 14 * 1000

  return adminAuth.createSessionCookie(idToken, { expiresIn: twoWeeks })
}

async function signOutFirebase() {
  await signOut(getAuth())
}

export {
  db,
  signUpWithEmailAndPassword,
  getSessionToken,
  signOutFirebase,
  signIn,
  adminAuth
}
