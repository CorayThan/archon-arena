import { CardInDeck, KCard } from "../card/KCard"
import { Expansion } from "../expansion/Expansion"
import { House } from "../house/House"

export interface Deck {
    id: string
    name: string
    cards: KCard[]
    expansion: Expansion
    houses: House[]
}
