import * as admin from "firebase-admin"
import * as functions from "firebase-functions"
import { CallableContext } from "firebase-functions/lib/providers/https"
import { requestDeck } from "./apis/mastervault/RequestDeck"
import { initializeGame } from "./InitializeGame"

admin.initializeApp()

exports.initializeGame = functions.https.onCall((data: any, context: CallableContext) => {
    return initializeGame.fakeGame()
})

exports.findDeck = functions.https.onCall((data: {deckId: string}) => {
    return requestDeck.findDeck(data.deckId)
})
