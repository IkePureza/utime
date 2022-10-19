"use strict";

import * as functions from "firebase-functions";
import sgMail from "@sendgrid/mail";
import * as admin from "firebase-admin";

// API Key for SendGrid Service, along with dynamic template ID
const TEMPLATE_ID = functions.config().sendgrid.template;
sgMail.setApiKey(functions.config().sendgrid.key);

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

// onCreate on collection inviteToken, send an invite email to the invited user.
export const sendInviteEmail = functions
  .region("australia-southeast1")
  .firestore.document("/inviteTokens/{documentId}")
  .onCreate(async (snap, context) => {
    const houseId = snap.data().houseId;

    const houseDataQuery = await admin
      .firestore()
      .collection("household")
      .where(admin.firestore.FieldPath.documentId(), "==", houseId)
      .get();

    const mailData = {
      invitee: snap.data().invitee,
      expiry: snap.data()?.expiryTime.toDate(),
      houseName: houseDataQuery.docs[0].data().name,
    };

    return inviteEmail(snap.data().email, mailData);
  });

async function inviteEmail(email: string, data: any) {
  const mailOptions = {
    from: "utimeapp0@gmail.com",
    to: email,
    templateId: TEMPLATE_ID,
    dynamic_template_data: {
      invitee: data.invitee,
      houseName: data.houseName,
      expiry: data.expiry,
    },
  };

  return sgMail.send(mailOptions);
}
