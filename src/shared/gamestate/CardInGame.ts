import { KCard } from "../keyforge/card/KCard"
import { Artifact } from "./Artifact"
import { Creature } from "./Creature"

export interface CardInGame {
    id: string
    ownerId: string
    house: string
    backingCard: KCard
}

export type AnyCardInGame = CardInGame | Creature | Artifact
