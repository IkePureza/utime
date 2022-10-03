"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserDocument = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.createUserDocument = functions
  .region("australia-southeast1")
  .auth.user()
  .onCreate(async (user) => {
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
//# sourceMappingURL=index.js.map
