import { CardNotInPlay } from "./CardNotInPlay"
import { KCard } from "../keyforge/card/KCard"

export interface Artifact {
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
