"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendInviteEmail = exports.createUserDocument = void 0;
const functions = __importStar(require("firebase-functions"));
const sgMail = __importStar(require("@sendgrid/mail"));
const admin = __importStar(require("firebase-admin"));
const serviceAccount = __importStar(require("../../serviceAccount.json"));
// API Key for SendGrid Service, along with dynamic template ID
const TEMPLATE_ID = functions.config().sendgrid.template;
sgMail.setApiKey(functions.config().sendgrid.key);
const params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};
admin.initializeApp({
  credential: admin.credential.cert(params),
});
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
// onCreate on collection inviteToken, send an invite email to the invited user.
exports.sendInviteEmail = functions
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
      expiry: snap.data().expiry_time.toDate(),
      houseName: houseDataQuery.docs[0].data().name,
    };
    return inviteEmail(snap.data().email, mailData);
  });
async function inviteEmail(email, data) {
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
//# sourceMappingURL=index.js.map
