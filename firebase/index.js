var admin = require('firebase-admin')
const dotenv = require('dotenv')
dotenv.config()

admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: 'olga-jewelry-5b577',
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: `-----BEGIN PRIVATE KEY-----\n${process.env.FIREBASE_PRIVATE_KEY.replace(
      /\\n/g,
      '\n'
    )}\n-----END PRIVATE KEY-----\n`,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: '108152787529503822838',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-393z3%40olga-jewelry-5b577.iam.gserviceaccount.com',
  }),
  databaseURL: 'https://olga-jewelry-5b577.firebaseio.com',
})

module.exports = admin
