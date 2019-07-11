import Action from "./Action"
import { GameStatusEffect } from "./GameStatusEffect"
import { PlayerMessage } from "./PlayerMessage"

export interface GameHistory {
    actions: Action[]
    messages: PlayerMessage[]
    activeStaticEffects: GameStatusEffect[]
}
