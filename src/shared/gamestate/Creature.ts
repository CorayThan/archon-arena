import {KCard} from "../keyforge/card/KCard"
import {CardInGame} from "./CardInGame"

export interface Creature extends CardInGame {
    id: string
    ready: boolean
    faceup: boolean

    // TODO remove, get from script
    taunt: boolean
    elusive: boolean
    skirmish: boolean
    poison: boolean
    deploy: boolean
    assault: number
    power: number
    hazardous: number
    armor: number
    traits: string[]
    upgrades: CardInGame[]
    cardsUnderneath: CardInGame[]
    tokens: {
        [key: string]: number
    }
    ownerId: string
    backingCard: KCard
}
