import { House } from "../house/House"
import { CardType } from "./CardType"

export interface KCard {
    idInDeck: string
    keyforgeId: string
    cardTitle: string
    house: House
    cardType: CardType
    frontImage: string
    cardText: string
    traits: string[]
    amber: number
    power: number
    armor: number
    flavorText?: string
    cardNumber: string
    expansion: number
    maverick: boolean
    legacy: boolean
}
