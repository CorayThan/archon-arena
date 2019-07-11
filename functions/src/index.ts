import * as admin from "firebase-admin"
import * as functions from "firebase-functions"
import { initializeGame } from "./InitializeGame"
import { requestDeck } from "./RequestDeck"

const serviceAccount = require("../forge-of-the-archons-firebase-adminsdk-key.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://forge-of-the-archons.firebaseio.com"
})

exports.findDeck = functions.https.onCall((data: { deckId: string }) => {
    // These were for testing. They should work but do not.
    // admin.firestore().collection("messages").add({original: "for me"})
    // matchCollection().add({original: "for me"})
    return requestDeck.findDeck(data.deckId)
})

exports.initializeGame = functions.https.onCall((data: { matchId: string }) => {
    console.log("Init game called")
    return initializeGame.startGame(data.matchId)
})
