import { GameEvent } from "../game/GameEvent"
import { PlayerInfo } from "./Player"

export default interface Action {
    message?: string
    side?: "right" | "left"
    type: GameEvent
    cardId?: string
    player?: PlayerInfo
    amount?: number
    upgradeId?: string
    creatureId?: string
}
