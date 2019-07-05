import { CardInDeck } from "../keyforge/card/KCard"
import { Player } from "../Player"
import { Artifact } from "./Artifact"
import { Creature } from "./Creature"
import { Phase } from "./Phase"
import { Upgrade } from "./Upgrade"

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
    player: Player
    library: CardInDeck[]
    hand: CardInDeck[]
    discard: CardInDeck[]
    archives: CardInDeck[]
    purged: CardInDeck[]
    creatures: Creature[]
    artifacts: Artifact[]
    upgrades: Upgrade[]
}
