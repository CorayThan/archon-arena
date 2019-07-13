import { KCard } from "../keyforge/card/KCard"
import { CardNotInPlay } from "./CardNotInPlay"

export interface Artifact extends CardNotInPlay {
    id: string
    ready: boolean
    faceup: boolean
    cardsUnderneath: CardNotInPlay[]
    purgedByThis: CardNotInPlay[]
    tokens: {
        amber: number
    }
    ownerId: string
    backingCard: KCard
}
