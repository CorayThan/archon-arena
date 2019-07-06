import { CardInDeck } from "../keyforge/card/KCard"

export interface Artifact {
    card: CardInDeck
    amber: number
    purgedByThis: CardInDeck[]
    exhausted: boolean
    cardsBeneath: CardInDeck[]
}
