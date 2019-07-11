import { random, shuffle } from "lodash"
import { Match } from "../../src/shared/Match"
import { matchCollection } from "./index"
import { GameState } from "./shared/gamestate/GameState"
import { Phase } from "./shared/gamestate/Phase"
import { Deck } from "./shared/keyforge/deck/Deck"

export class InitializeGame {

    startGame = async (matchId: string): Promise<GameState> => {

        const matchDoc = await matchCollection().doc(matchId).get()
        if (matchDoc.exists) {
            const {firstPlayerId, secondPlayerId, firstPlayerActiveDeck, secondPlayerActiveDeck} = matchDoc.data() as Match
            const firstPlayer = random(0, 1) === 0 ? firstPlayerId : secondPlayerId!
            const gameState: GameState = {
                turn: 1,
                startingPlayer: firstPlayer,
                activePlayer: firstPlayer,
                phase: Phase.CHOOSE_HAND,
                playerOneState: this.createPlayerState(firstPlayerId, firstPlayerActiveDeck, firstPlayer === firstPlayerId),
                playerTwoState: this.createPlayerState(secondPlayerId!, secondPlayerActiveDeck!, firstPlayer === secondPlayerId)
            }

            // TODO Make this work. Check SO for answer: https://stackoverflow.com/questions/56927411/firebase-cloud-function-wont-insert-into-firestore
            // await firestore.collection("gameState").doc(matchId).set(gameState)

            return gameState
        } else {
            throw new Error(`No match doc for matchId: ${matchId}`)
        }
    }

    private createPlayerState = (playerId: string, deck: Deck, firstPlayer: boolean) => {
        const cards = shuffle(deck.cards.map((card, idx) => ({
            card,
            num: idx,
            ownerId: playerId
        })))

        return {
            playerId,
            hand: cards.slice(0, firstPlayer ? 7 : 6),
            library: cards.slice(firstPlayer ? 7 : 6),
            discard: [],
            archives: [],
            purged: [],
            creatures: [],
            artifacts: [],
            upgrades: []
        }
    }
}

export const initializeGame = new InitializeGame()
