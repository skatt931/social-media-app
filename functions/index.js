// 4:03:13
const functions = require("firebase-functions");

const app = require("express")();

const {
  db
} = require('./util/admin');

const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream
} = require("./handlers/screems");

const {
  getAllUsers,
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead
} = require("./handlers/users");

const FBAuth = require("./util/fbAuth");

// Scream routs
app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, postOneScream);
app.get("/scream/:screamId", getScream);
app.get("/scream/:screamId/like", FBAuth, likeScream);
app.get("/scream/:screamId/unlike", FBAuth, unlikeScream);
app.post("/scream/:screamId/comment", FBAuth, commentOnScream);
app.delete("/scream/:screamId", FBAuth, deleteScream);

// User routes
app.get("/users", getAllUsers);
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:handle", getUserDetails);
app.post("/notifications", FBAuth, markNotificationsRead);

// // Create and Deploy Your First Cloud Functions
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello Ihor!");
});

exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions.region('europe-west2').firestore.document('likes/{id}')
  .onCreate((snapshot) => {
    return db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then(doc => {
        if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
          return db.doc(`/notifications/${snapshot.id}`)
            .set({
              recepient: doc.data().userHandle,
              sender: snapshot.data().userHandle,
              read: false,
              screamId: doc.id,
              type: 'like',
              createdAt: new Date().toISOString()
            });
        }
      })
      .catch(err => {
        console.error(err);
      })
  })

exports.deleteNotificationOnUnlike = functions
  .region('europe-west2')
  .firestore
  .document('likes/{id}')
  .onDelete((snapshot) => {
    return db.doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch(err => {
        console.error(err);
      })
  })

exports.createNotificationOnComment = functions
  .region('europe-west2')
  .firestore
  .document('comments/{id}')
  .onCreate((snapshot) => {
    return db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then(doc => {
        if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
          return db.doc(`/notifications/${snapshot.id}`)
            .set({
              recepient: doc.data().userHandle,
              sender: snapshot.data().userHandle,
              read: false,
              screamId: doc.id,
              type: 'comment',
              createdAt: new Date().toISOString()
            });
        }
      })
      .catch(err => {
        console.error(err);
      })
  })