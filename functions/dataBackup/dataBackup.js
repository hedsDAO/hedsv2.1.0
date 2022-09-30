const functions = require("firebase-functions");
const { MongoClient } = require("mongodb");
const admin = require("firebase-admin");
// const serviceKey = require("../utils/service_key.json");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// The express instance
const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

const getUsers = async () => {
  const MONGO_HOST = process.env.MONGO_HOST;
  const MONGO_PORT = process.env.MONGO_PORT;

  // Create a new MongoClient
  const client = new MongoClient(`mongodb://${MONGO_HOST}:${MONGO_PORT}`);
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    functions.logger.log("connected");
    const data = await client.db("parse").collection("_User").find().toArray();
    const userData = [...data];
    backupUsersToFirebase(userData);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

// const backupUsersToFirebase = async (userData) => {
//   await admin.initializeApp({
//     credential: admin.credential.cert(serviceKey),
//     databaseURL: process.env.FIRE_DB_URL,
//   });
//   const firestore = admin.firestore();
//   const userRef = firestore.collection("usersBackup");
//   userData.forEach(async (user) => {
//     if (user.ethAddress) {
//       await userRef.doc(user.ethAddress).set(user);
//     }
//   });
//   functions.logger.log("Backup Completed")
// };


app.get("/", (request, response) => {
  getUsers().then(() => {
    return response.status(200).send("Backup Completed");
  });
});


exports.dataBackup = functions.https.onRequest(app);