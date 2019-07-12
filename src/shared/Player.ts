import { Deck } from "./keyforge/deck/Deck"

export interface Player {
    displayName: string
    decks: Deck[]
    activeDeck?: Deck
    currentMatchId?: string | null
}

export interface PlayerInfo {
    id: string
    name: string
}
