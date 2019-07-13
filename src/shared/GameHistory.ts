import Action from "./Action"
import { PlayerMessage } from "./PlayerMessage"

export interface GameHistory {
    actions: Action[]
    messages: PlayerMessage[]
}
