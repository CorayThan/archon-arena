import { StatusEffect } from "../GameStatusEffect"
import { PlayerInfo } from "../Player"
import { Artifact } from "./Artifact"
import { CardNotInPlay } from "./CardNotInPlay"
import { Creature } from "./Creature"
import { Phase } from "./Phase"

// TODO store started at date
export interface GameState {
    id: string
    turn: number
    startingPlayer: PlayerInfo
    activePlayer: PlayerInfo
    phase: Phase
    playerOneState: PlayerState
    playerTwoState: PlayerState

    /**
     * Map key is turn of the game it is applied to (Treasure map applies to current turn's index, scrambler storm to next,e tc.)
     * array is all the effects in effect for that turn
     */
    statusEffects?: Map<number, StatusEffect[]>
}

export interface PlayerState {
    player: PlayerInfo
    amber: number,
    chains: number,
    keys: number,
    library: CardNotInPlay[]
    hand: CardNotInPlay[]
    discard: CardNotInPlay[]
    archives: CardNotInPlay[]
    purged: CardNotInPlay[]
    creatures: Creature[]
    artifacts: Artifact[]
}
