export default interface Action {
    message: string
    side?: "right" | "left"
    type: Event
    cardID: string
    playerName: string
    amount?: number
    upgradeID?: string
    creatureID?: string
}

