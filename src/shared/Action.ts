import { AEvent } from "../game/AEvent"
import { PlayerInfo } from "./Player"

export default interface Action {
    message?: string
    side?: "right" | "left"
    type: AEvent
    cardId?: string
    player?: PlayerInfo
    amount?: number
    upgradeId?: string
    creatureId?: string
}
