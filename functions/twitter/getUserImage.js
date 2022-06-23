// The Cloud Functions for Firebase SDK to create Cloud Functions and
// set up triggers.
const functions = require("firebase-functions");
// const https = require("https")
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Twitter = require("twitter-v2");

// The express instance
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get("/:_usernames", (request, response) => {
  functions.logger.log(request.params._usernames, "params username");
  const authorizedUser = () => {
    const client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_KEY,
      access_token_secret: process.env.TWITTER_TOKEN_SECRET,
    });
    return client;
  };
  (async function () {
    const authUser = await authorizedUser();
    const fields = "profile_image_url";
    if (authUser) {
      authUser
        .get("users/by", { usernames: "" + request.params._usernames, "user.fields": fields })
        .then((res) => {
          functions.logger.log(res);
          return response.status(200).json(res);
        })
        .catch((err) => {
          functions.logger.log(err);
          return response.status(400).send("user not found");
        });
    }
  })();
});


// Expose Express API as a single Cloud Function:
exports.getUserImage = functions.https.onRequest(app);
