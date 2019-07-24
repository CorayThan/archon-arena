import * as admin from "firebase-admin"
import { random, shuffle } from "lodash"
import { v4 as uuid } from "uuid"

export class InitializeGame {

    startGame = async (matchId: string): Promise<any> => {

        const matchDoc = await admin.firestore().collection("match").doc(matchId).get()
        if (matchDoc.exists) {
            const {firstPlayerId, secondPlayerId, firstPlayerDisplayName, secondPlayerDisplayName, firstPlayerActiveDeck, secondPlayerActiveDeck} = matchDoc.data()
            const firstPlayer = random(0, 1) === 0 ? firstPlayerId : secondPlayerId!
            const gameState = {
                turn: 1,
                startingPlayer: firstPlayer,
                activePlayer: firstPlayer,
                phase: "CHOOSE_HAND",
                playerOneState: this.createPlayerState(firstPlayerId, firstPlayerDisplayName, firstPlayerActiveDeck, firstPlayer === firstPlayerId),
                playerTwoState: this.createPlayerState(secondPlayerId!, secondPlayerDisplayName!, secondPlayerActiveDeck!, firstPlayer === secondPlayerId)
            }

            // TODO Make this work. Check SO for answer: https://stackoverflow.com/questions/56927411/firebase-cloud-function-wont-insert-into-firestore
            await admin.firestore().collection("gameState").doc(matchId).set(gameState)
            return gameState
        } else {
            throw new Error(`No match doc for matchId: ${matchId}`)
        }
    }

    private createPlayerState = (playerId: string, playerName: string, deck: any, firstPlayer: boolean) => {
        const cards = shuffle(deck.cards.map((card, idx) => ({
            id: uuid(),
            backingCard: card,
            ownerId: playerId
        })))

        return {
            player: {
                id: playerId,
                name: playerName
            },
            amber: 0,
            chains: 0,
            keys: 0,
            hand: cards.slice(0, firstPlayer ? 7 : 6),
            library: cards.slice(firstPlayer ? 7 : 6),
            discard: [],
            archives: [],
            purged: [],
            creatures: [],
            artifacts: []
        }
    }
}

export const initializeGame = new InitializeGame()
