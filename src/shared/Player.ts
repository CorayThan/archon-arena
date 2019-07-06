import { Deck } from "./keyforge/deck/Deck"

export interface Player {
    id: string
    displayName: string
    authId: string
    decks: Deck[]
}
