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
