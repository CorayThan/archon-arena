import axios from "axios"
import { CardType } from "../../shared/keyforge/card/CardType"
import { Rarity } from "../../shared/keyforge/card/Rarity"
import { Deck } from "../../shared/keyforge/deck/Deck"
import { expansionFromNumber } from "../../shared/keyforge/expansion/Expansion"
import { House } from "../../shared/keyforge/house/House"

export class RequestDeck {
    findDeck = async (id: string): Promise<Deck> => {
        const response = await axios.get(`https://www.keyforgegame.com/api/decks/${id}/?links=cards`)
        const deck: KeyForgeDeckDto = response.data

        return {
            id: deck.data.id,
            name: deck.data.name,
            expansion: expansionFromNumber(deck.data.expansion),
            houses: deck.data._links.houses,
            cards: deck._linked.cards.map((keyForgeCard) => ({
                id: keyForgeCard.id,
                cardTitle: keyForgeCard.card_title,
                house: keyForgeCard.house,
                cardType: keyForgeCard.card_type,
                frontImage: keyForgeCard.front_image,
                cardText: keyForgeCard.card_text,
                traits: keyForgeCard.traits == null ? [] : keyForgeCard.traits.split(" • "),
                amber: keyForgeCard.amber,
                power: keyForgeCard.power == null ? 0 : Number(keyForgeCard.power),
                armor: keyForgeCard.armor == null ? 0 : Number(keyForgeCard.armor),
                flavorText: keyForgeCard.flavor_text,
                cardNumber: keyForgeCard.card_number,
                expansion: keyForgeCard.expansion,
                maverick: keyForgeCard.is_maverick,
            }))
        }
    }
}

export const requestDeck = new RequestDeck()

interface KeyForgeDeckDto {
    data: KeyForgeDeck
    _linked: KeyForgeDeckLinksFullCards
}

interface KeyForgeDeck {
    id: string
    name: string
    expansion: number
    power_level: number
    chains: number
    wins: number
    losses: number
    _links: KeyForgeDeckLinks
}

interface KeyForgeDeckLinks {
    houses: House[]
    cards: string[]
}

interface KeyForgeDeckLinksFullCards {
    houses: KeyForgeHouse[]
    cards: KeyForgeCard[]
}

interface KeyForgeHouse {
    id: string
    name: string
    image: string
}

interface KeyForgeCard {
    id: string
    card_title: string
    house: House
    card_type: CardType
    front_image: string
    card_text: string
    amber: number
    power?: string
    armor?: string
    rarity: Rarity
    flavor_text?: string
    card_number: string
    expansion: number
    is_maverick: boolean
    traits?: string
}
