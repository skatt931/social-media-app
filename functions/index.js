// Autenthication Middleware 1:30:40
const functions = require("firebase-functions");

const app = require("express")();

const {
  getAllScreams,
  postOneScream
} = require('./handlers/screems');

const {
  getAllUsers,
  signup,
  login
} = require('./handlers/users');

const FBAuth = require('./util/fbAuth');

// Scream routs
app.get("/screams", getAllScreams);

// User routes
app.get("/users", getAllUsers);
app.post("/signup", signup);
app.post("/login", login);

// Post a scream
app.post("/scream", FBAuth, postOneScream);

// // Create and Deploy Your First Cloud Functions
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello Ihor!");
});

exports.api = functions.https.onRequest(app);