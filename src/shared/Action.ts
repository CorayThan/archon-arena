import { InputEvent } from "../game/InputEvent"
import { PlayerInfo } from "./Player"

export default interface Action {
    message?: string
    flank?: "right" | "left"
    type: InputEvent
    cardId?: string
    player?: PlayerInfo
    amount?: number
    upgradeId?: string
    creatureId?: string
}
