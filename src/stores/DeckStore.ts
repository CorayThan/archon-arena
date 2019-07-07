import * as firebase from "firebase"
import { Deck } from "../shared/keyforge/deck/Deck"
import { messageStore } from "./MessageStore"
import { playerStore } from "./PlayerStore"

export class DeckStore {
    addDeck = async (deckId: string) => {
        const deckResult = await firebase.functions().httpsCallable("findDeck")({deckId})
        const deck = await deckResult.data as Deck
        const userDecks = playerStore.player!.decks
        if (userDecks.filter(usersDeck => usersDeck.id === deck.id).length > 0) {
            messageStore.setErrorMessage(`You already have a deck with id ${deck.id} added.`)
        } else {
            userDecks.push(deck)
            await playerStore.upsertPlayer({decks: userDecks})
        }
    }

    clearDecks = async () => {
        await playerStore.upsertPlayer({decks: []})
    }
}

export const deckStore = new DeckStore()
