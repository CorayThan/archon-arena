export default interface Action {
    message: string
    side?: "right" | "left"
    type: Event
    cardId: string
    playerName: string
    amount?: number
    upgradeId?: string
    creatureId?: string
}

