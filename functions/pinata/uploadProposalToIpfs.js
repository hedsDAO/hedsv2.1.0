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

app.post("/", (request, response) => {
    functions.logger.log("body", request.body);
    const {creator, title} = request.body;
    const options = {
        pinataMetadata: {
          name: title,
          keyvalues: {
            creator,
          },
        },
        pinataOptions: {
          cidVersion: 0,
        },
      };
    pinata.pinJSONToIPFS(request.body, options).then((result) => {
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
exports.uploadProposalToIpfs = functions.https.onRequest(app);