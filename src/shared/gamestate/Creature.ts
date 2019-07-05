import { CardInDeck } from "../keyforge/card/KCard"

export interface Creature {
    card: CardInDeck
    damage: number
    power: number
    stunned: boolean
    exhausted: boolean
    capturedAmber: number
    armor: number
    doomToken: boolean
    elusive: boolean
    cardsBeneath: CardInDeck[]
}