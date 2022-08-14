import * as functions from "firebase-functions";
import { doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const clientCredentials = {
  apiKey: "AIzaSyCk8UcqbP-3N8R0J3kkGFZXOP8-7rDnhLA",
  authDomain: "shitimes-f199b.firebaseapp.com",
  projectId: "shitimes-f199b",
  storageBucket: "shitimes-f199b.appspot.com",
  messagingSenderId: "358568706069",
  appId: "1:358568706069:web:3ca32eea681e8bf7b7ce1c",
  measurementId: "G-FCZVPNY42Q",
};

const app = initializeApp(clientCredentials);

const db = getFirestore(app);

export const createUserDocument = functions
  .region("australia-southeast1")
  .auth.user()
  .onCreate(async (user: any): Promise<any> => {
    return setDoc(doc(db, "users", user.uid), {
      data: JSON.parse(JSON.stringify(user)),
    }).then(() => {
      console.log("Document written: ", user);
    });
  });
