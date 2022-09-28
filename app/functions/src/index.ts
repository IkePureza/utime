"use strict";

import functions = require("firebase-functions");
import admin = require("firebase-admin");
admin.initializeApp();

export const createUserDocument = functions
  .region("australia-southeast1")
  .auth.user()
  .onCreate(async (user: any): Promise<any> => {
    admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set({ data: JSON.parse(JSON.stringify(user)) })
      .then(() => {
        console.log("Document Written: ", user);
        return;
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  });
