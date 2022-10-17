
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

// UTILS API
const generateId = require("./utils/generateId");

// TWITTER API
const twitterAuth = require("./twitter/auth");
const twitterGetUserImage = require("./twitter/getUserImage");

// PINATA API
const pinHashToIpfs = require("./pinata/pinHashToIpfs");
const uploadProposalToIpfs = require("./pinata/uploadProposalToIpfs");
const unpinProposalFromIpfs = require("./pinata/unpinProposalFromIpfs");

//Moralis User Data Backup
const dataBackup = require("./dataBackup/dataBackup");

exports.generateId = generateId.generateId;
exports.twitterAuth = twitterAuth.auth;
exports.twitterGetUserImage = twitterGetUserImage.getUserImage;
exports.pinHashToIpfs = pinHashToIpfs.pinHashToIpfs;
exports.uploadProposalToIpfs = uploadProposalToIpfs.uploadProposalToIpfs;
exports.unpinProposalFromIpfs = unpinProposalFromIpfs.unpinProposalFromIpfs;
exports.dataBackup = dataBackup.dataBackup;