import { KCard } from "../keyforge/card/KCard"
import { CardInGame } from "./CardInGame"

export interface Artifact extends CardInGame {
    id: string
    ready: boolean
    faceup: boolean
    cardsUnderneath: CardInGame[]
    purgedByThis: CardInGame[]
    tokens: {
        amber: number
    }
    ownerId: string
    backingCard: KCard
}
