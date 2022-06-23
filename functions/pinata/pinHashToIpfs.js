// The Cloud Functions for Firebase SDK to create Cloud Functions and
// set up triggers.
const functions = require("firebase-functions");
const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// The express instance
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.post("/:_hash", (request, response) => {
    functions.logger.log(request.params._hash, "params hash");
    const options = request.body;
    functions.logger.log(options, "options");
    pinata.pinByHash(request.params._hash, options).then((result) => {
        functions.logger.log(result);
        pinata.pinJobs().then((res) => {
            functions.logger.log(res);
            return response.status(200).send(result);
        });
    }).catch((err) => {
        //handle error here
        return response.status(400).send(err);
    });
});

// Expose Express API as a single Cloud Function:
exports.pinHashToIpfs = functions.https.onRequest(app);
