import Action from "../Action"
import {Effect} from "../GameEffect"
import {PlayerInfo} from "../Player"
import {Artifact} from "./Artifact"
import {CardInGame} from "./CardInGame"
import {Creature} from "./Creature"

// TODO store started at date
export interface GameState {
    id: string
    turn: number
    startingPlayer: PlayerInfo
    activePlayer: PlayerInfo
    playerOneState: PlayerState
    playerTwoState: PlayerState

    actions: Action[]

    /**
     * Map key is turn of the game it is applied to (Treasure map applies to current turn's index, scrambler storm to next,e tc.)
     * array is all the effects in effect for that turn
     */
    effects?: Map<number, Effect[]>
}

export interface PlayerState {
    deckHouses: string[]
    player: PlayerInfo
    amber: number,
    chains: number,
    keys: number,
    keyCost: number,
    handSize: number,
    library: CardInGame[]
    hand: CardInGame[]
    discard: CardInGame[]
    archives: CardInGame[]
    purged: CardInGame[]
    creatures: Creature[]
    artifacts: Artifact[]
}
