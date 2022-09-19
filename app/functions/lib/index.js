"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserDocument = void 0;
const functions = require("firebase-functions");
const firestore_1 = require("firebase/firestore");
const app_1 = require("firebase/app");
const firestore_2 = require("firebase/firestore");
const clientCredentials = {
  apiKey: "AIzaSyCk8UcqbP-3N8R0J3kkGFZXOP8-7rDnhLA",
  authDomain: "shitimes-f199b.firebaseapp.com",
  projectId: "shitimes-f199b",
  storageBucket: "shitimes-f199b.appspot.com",
  messagingSenderId: "358568706069",
  appId: "1:358568706069:web:3ca32eea681e8bf7b7ce1c",
  measurementId: "G-FCZVPNY42Q",
};
const app = (0, app_1.initializeApp)(clientCredentials);
const db = (0, firestore_2.getFirestore)(app);
exports.createUserDocument = functions
  .region("australia-southeast1")
  .auth.user()
  .onCreate(async (user) => {
    return (0, firestore_1.setDoc)(
      (0, firestore_1.doc)(db, "users", user.uid),
      {
        data: JSON.parse(JSON.stringify(user)),
      }
    ).then(() => {
      console.log("Document written: ", user);
    });
  });
//# sourceMappingURL=index.js.map
