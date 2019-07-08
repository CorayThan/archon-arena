import * as admin from "firebase-admin"
import * as functions from "firebase-functions"
import { CallableContext } from "firebase-functions/lib/providers/https"
import * as loglevel from "loglevel"
import { requestDeck } from "./apis/mastervault/RequestDeck"
import { initializeGame } from "./InitializeGame"

export const log = loglevel
log.setDefaultLevel("debug")

admin.initializeApp()

export const firestore = admin.firestore()
export const matchCollection = () => firestore.collection("match")
export const gameStateCollection = () => firestore.collection("gameState")

exports.initializeGame = functions.https.onCall((data: { matchId: string }, context: CallableContext) => {
    console.log("Init game called")
    return initializeGame.startGame(data.matchId)
})

exports.findDeck = functions.https.onCall((data: { deckId: string }) => {
    admin.firestore().collection("messages").add({original: "for me"})
    return requestDeck.findDeck(data.deckId)
})
