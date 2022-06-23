// The Cloud Functions for Firebase SDK to create Cloud Functions and
// set up triggers.
const functions = require("firebase-functions");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const randomData = require("../common/randomData");

// The express instance
const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

app.get("/", (request, response) => {
  const { adjectives,  animals} = randomData;
  const randomAdj = Math.ceil(Math.random() * (adjectives.length));
  const randomAnimal = Math.ceil(Math.random() * (animals.length));
  const submissionId = [adjectives[randomAdj], animals[randomAnimal]].join(" ");
  functions.logger.log(submissionId);
  return response.status(200).json(submissionId);
});

// Expose Express API as a single Cloud Function:
exports.generateId = functions.https.onRequest(app);