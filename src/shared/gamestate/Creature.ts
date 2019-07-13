import { KCard } from "../../shared/keyforge/card/KCard"
import { CardNotInPlay } from "./CardNotInPlay"

export interface Creature extends CardNotInPlay {
    id: string
    ready: boolean
    faceup: boolean

    // TODO remove, get from script
    taunt: boolean

    power: number
    traits: string[]
    upgrades: CardNotInPlay[]
    cardsUnderneath: CardNotInPlay[]
    tokens: {
        [key: string]: number
    }
    ownerId: string
    backingCard: KCard
}
