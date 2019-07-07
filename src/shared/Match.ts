export interface Match {
    matchId: string

    firstPlayerId: string
    firstPlayerDisplayName: string
    firstPlayerActiveDeckId: string
    firstPlayerDeckName: string
    secondPlayerId?: string
    secondPlayerDisplayName?: string
    secondPlayerActiveDeckId?: string
    secondPlayerDeckName?: string

    gameStateId?: string
}
