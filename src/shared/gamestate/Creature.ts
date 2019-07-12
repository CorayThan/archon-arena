import { CardNotInPlay } from "./CardNotInPlay"
import { KCard } from "../../shared/keyforge/card/KCard"

export interface Creature {
    id: string,
    ready: boolean,
    faceup: boolean,
    taunt: boolean,
    upgrades: CardNotInPlay[],
    cardsUnderneath: CardNotInPlay[],
    tokens: {
        [key: string]: number
    }
    ownerId: string
    backingCard: KCard
}
