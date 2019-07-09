import { Deck } from "./keyforge/deck/Deck"

export interface Match {
    matchId: string

    firstPlayerId: string
    firstPlayerDisplayName: string
    firstPlayerActiveDeck: Deck
    secondPlayerId?: string
    secondPlayerDisplayName?: string
    secondPlayerActiveDeck?: Deck
    secondPlayerDeckName?: string

    gameStateId?: string
}
