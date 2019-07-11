import { Artifact } from "./Artifact"
import { Creature } from "./Creature"
import { CardNotInPlay } from "./CardNotInPlay"
import { Phase } from "./Phase"

export interface GameState {
    id: string
    turn: number
    startingPlayer: string
    activePlayer: string
    phase: Phase
    playerOneState: PlayerState
    playerTwoState: PlayerState
}

export interface PlayerState {
    playerId: string
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
