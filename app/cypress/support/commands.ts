/// <reference types="cypress" />

import firebase from "firebase/compat/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const fbConfig = {
  apiKey: Cypress.env("FIREBASE_API_KEY"),
  authDomain: Cypress.env("FIREBASE_AUTH_DOMAIN"),
  projectId: Cypress.env("FIREBASE_PROJECT_ID"),
  storageBucket: Cypress.env("FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: Cypress.env("FIREBASE_MESSAGING_SENDER_ID"),
  appId: Cypress.env("FIREBASE_APP_ID"),
};

const app = firebase.initializeApp(fbConfig);
const auth = getAuth();
const db = getFirestore(app);
const functions = getFunctions(app);
const storage = getStorage(app);

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

// Emulate Firebase Storage if Env variable is passed
const storageEmulatorHost = Cypress.env("FIREBASE_STORAGE_EMULATOR_HOST");
if (storageEmulatorHost) {
  connectStorageEmulator(storage, "localhost", 9199);
}

Cypress.Commands.add("login", () => {
  cy.visit("/login");
  cy.location("href").should("include", "/login");
  cy.get("input[id=email-login]").type("cypresstest@mail.com");
  cy.get("input[id=password-login]").type("123456");
  cy.get("button[type=submit]").click();
  cy.hash().should("eq", "");
  cy.wait(2000);
  cy.get(".loading").should("not.exist");
});

Cypress.Commands.add("logout", () => {
  cy.wait(1000);
  cy.get(".loading").should("not.exist");
  cy.get("svg[id=hamburger]").click();
  cy.contains("Logout").should("be.visible").click();
  cy.location("href").should("include", "/login");
});

Cypress.Commands.add("createHousehold", () => {
  cy.get("#createHousehold").click();
  cy.get("input[id=houseName]").click().type("testHouse");
  cy.get("textarea[id=houseDesc]").click().type("Test in progress");
  cy.get(".min-w-full > .btn").click();
  cy.wait(1000);
  cy.contains("testHouse");
  cy.contains("Test in progress");
});

Cypress.Commands.add("loadWait", () => {
  cy.wait(1000);
  cy.get(".loading").should("not.exist");
});
