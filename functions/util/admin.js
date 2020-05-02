const admin = require("firebase-admin");

const serviceAccount = require("../key/key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://socialapp-e0f64.firebaseio.com",
});

const db = admin.firestore();

module.exports = {
    admin,
    db
};