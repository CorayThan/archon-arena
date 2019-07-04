import { requestDeck } from "../apis/mastervault/RequestDeck"
import { Deck } from "../keyforge/deck/Deck"
import { Player } from "../players/types/Player"
import { GameState } from "./types/GameState"
import { v4 as uuid} from "uuid"
import { Phase } from "./types/Phase"
import {shuffle, random} from "lodash"

export class InitializeGame {

    fakeGame = async () => {
        const deckOne = await requestDeck.findDeck("7b38b1f3-66e5-410a-86d5-85e74fac24e9")
        const deckTwo = await requestDeck.findDeck("4f34017e-646e-4380-8ff6-16b47ab72971")
        return this.startGame({
            id: "123",
            name: "CorayThan",
        }, deckOne, {
            id: "456",
            name: "StrongLink",
        }, deckTwo)
    }

    startGame = (playerOne: Player, deckOne: Deck, playerTwo: Player, deckTwo: Deck): GameState => {
        const firstPlayer = random(0, 1) === 0 ? playerOne : playerTwo
        return {
            id: uuid(),
            turn: 1,
            startingPlayer: firstPlayer.id,
            activePlayer: firstPlayer.id,
            phase: Phase.CHOOSE_HAND,
            playerOneState: this.createPlayerState(playerOne, deckOne, firstPlayer === playerOne),
            playerTwoState: this.createPlayerState(playerTwo, deckTwo, firstPlayer === playerTwo)
        }
    }

    private createPlayerState = (player: Player, deck: Deck, firstPlayer: boolean) => {
        const cards = shuffle(deck.cards.map((card, idx) => ({
            card,
            num: idx,
            ownerId: player.id
        })))

        return {
            player,
            hand: cards.slice(0, firstPlayer ? 7 : 6),
            library: cards.slice(firstPlayer ? 7 : 6),
            discard: [],
            archives: [],
            purged: [],
            creatures: []
        }
    }
}

export const initializeGame = new InitializeGame()