import { CardInDeck, KCard } from "../../keyforge/card/KCard"
import { Player } from "../../players/types/Player"
import { Creature } from "./Creature"
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
    player: Player
    library: CardInDeck[]
    hand: CardInDeck[]
    discard: CardInDeck[]
    archives: CardInDeck[]
    purged: CardInDeck[]
    creatures: Creature[]
}
