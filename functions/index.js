const functions = require('firebase-functions');
const admin = require("firebase-admin");

var serviceAccount = require("./key/key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://socialapp-e0f64.firebaseio.com"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello Ihor!");
});

exports.getScreems = functions.https.onRequest((req, res) => {
    admin.firestore().collection('screems').get().then(data => {
            let screems = [];
            data.forEach(doc => {
                screems.push(doc.data());
            });
            return res.json(screems);
        })
        .catch(err => console.log('My error', err));
});

exports.createScreem = functions.https.onRequest((req, res) => {
    if (req.method !== 'POST') {
        return res.status(400).json({
            error: 'Method not allowed!'
        });
    }
    const newScreem = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    };

    admin.firestore().collection('screems').add(newScreem)
        .then(doc => {
            res.json({
                message: `document ${doc.id} created successfuly!`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `something went wrong! ${err}`
            });
            console.log(err);
        });
})