const functions = require("firebase-functions");
const admin = require("firebase-admin");

const serviceAccount = require("./key/key.json");
const app = require("express")();

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQDdmSdBWLORypUZHop5g_mYi6cadvlPg",
    authDomain: "socialapp-e0f64.firebaseapp.com",
    databaseURL: "https://socialapp-e0f64.firebaseio.com",
    projectId: "socialapp-e0f64",
    storageBucket: "socialapp-e0f64.appspot.com",
    messagingSenderId: "468385558230",
    appId: "1:468385558230:web:cb955dfd911d1aa320a377",
    measurementId: "G-PJZH7YYJES"
};

const firebase = require("firebase");

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://socialapp-e0f64.firebaseio.com"
});

const db = admin.firestore();

app.get("/screams", (req, res) => {
    db.collection("screams")
        .orderBy("createdAt", "asc")
        .get()
        .then(data => {
            let screams = [];
            data.forEach(doc => {
                screams.push({
                    screamId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt
                });
            });
            return res.json(screams);
        })
        .catch(err => console.log("My error", err));
});

app.post("/scream", (req, res) => {
    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    };

    db.collection("screams")
        .add(newScream)
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
});

// // Create and Deploy Your First Cloud Functions
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello Ihor!");
});

// Signup route
app.post("/signup", (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    };

    let token, userId;
    db.doc(`users/${newUser.handle}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({
                    handle: `This handle already exists`
                });
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then(idToken => {
            token = idToken;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toDateString(),
                userId
            }

            return db.doc(`/users/${newUser.handle}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({
                token
            })
        })
        .catch(err => {
            if (err.code === "auth/email-already-in-use") {
                return res.status(400).json({
                    email: "Email already in use"
                });
            } else {
                return res.status(500).json({
                    error: err.code
                });
            }
        });
});

exports.api = functions.https.onRequest(app);