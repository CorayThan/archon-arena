import * as functions from "firebase-functions"
import { CallableContext } from "firebase-functions/lib/providers/https"
import { initializeGame } from "./InitializeGame"

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request: any, response: any) => {
    response.send("Hello from Firebase!")
})

exports.initializeGame = functions.https.onCall((data: any, context: CallableContext) => {
    return initializeGame.fakeGame()
})
