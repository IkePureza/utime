/// <reference types="cypress" />

import firebase from "firebase/compat/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
  apiKey: Cypress.env("FIREBASE_API_KEY"),
  authDomain: Cypress.env("FIREBASE_AUTH_DOMAIN"),
  projectId: Cypress.env("FIREBASE_PROJECT_ID"),
  storageBucket: Cypress.env("FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: Cypress.env("FIREBASE_MESSAGING_SENDER_ID"),
  appId: Cypress.env("FIREBASE_APP_ID"),
};

const app = firebase.initializeApp(fbConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

// Emulate Firestore if Env variable is passed
const firestoreEmulatorHost = Cypress.env("FIRESTORE_EMULATOR_HOST");
if (firestoreEmulatorHost) {
  connectFirestoreEmulator(db, "localhost", 8080);
  console.log(`Using Firestore emulator: http://${firestoreEmulatorHost}/`);
}

// Emulate Firebase Auth if Env variable is passed
const authEmulatorHost = Cypress.env("FIREBASE_AUTH_EMULATOR_HOST");
if (authEmulatorHost) {
  connectAuthEmulator(auth, "http://localhost:9099");
  console.debug(`Using Auth emulator: http://${authEmulatorHost}/`);
}

// Emulate Firebase Cloud Function if Env variable is passed.
const functionsEmulatorHost = Cypress.env("FIREBASE_FUNCTIONS_EMULATOR_HOST");
if (functionsEmulatorHost) {
  connectFunctionsEmulator(functions, "localhost", 5001);
  console.debug(`Using Functions emulator: http://${functionsEmulatorHost}/`);
}

attachCustomCommands({ Cypress, cy, firebase });
