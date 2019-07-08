import { CardInDeck } from "../keyforge/card/KCard"
import { Artifact } from "./Artifact"
import { Creature } from "./Creature"
import { Phase } from "./Phase"
import { Upgrade } from "./Upgrade"

export interface GameState {
    turn: number
    startingPlayer: string
    activePlayer: string
    phase: Phase
    playerOneState: PlayerState
    playerTwoState: PlayerState
}

export interface PlayerState {
    playerId: string
    library: CardInDeck[]
    hand: CardInDeck[]
    discard: CardInDeck[]
    archives: CardInDeck[]
    purged: CardInDeck[]
    creatures: Creature[]
    artifacts: Artifact[]
    upgrades: Upgrade[]
}
