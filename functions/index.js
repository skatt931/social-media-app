// 2:26:30
const functions = require("firebase-functions");

const app = require("express")();

const {
  getAllScreams,
  postOneScream
} = require("./handlers/screems");

const {
  getAllUsers,
  signup,
  login,
  uploadImage,
  addUserDetails,
} = require("./handlers/users");

const FBAuth = require("./util/fbAuth");

// Scream routs
app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, postOneScream);

// User routes
app.get("/users", getAllUsers);
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);

// // Create and Deploy Your First Cloud Functions
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello Ihor!");
});

exports.api = functions.https.onRequest(app);