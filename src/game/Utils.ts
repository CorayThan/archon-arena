import Phaser from "phaser"
import { CardInGame } from "../shared/gamestate/CardInGame"

const cardNameReplacementRegex = /[^\d\w\s]/g
const spaceRegex = /\s/g
const cardNameToCardNameKey = (name: string) => {
    return name.replace(cardNameReplacementRegex, "")
        .replace(spaceRegex, "-")
        .toLowerCase()
}

const cardNameToUrl = (name: string) => `https://keyforge-card-images.s3-us-west-2.amazonaws.com/card-imgs/${cardNameToCardNameKey(name)}.png`

export const preloadCardsInPhaser = (scene: Phaser.Scene, cards: CardInGame[]) => {
    cards.forEach((card: CardInGame) => {
        scene.load.image(card.backingCard.cardTitle, cardNameToUrl(card.backingCard.cardTitle))
        scene.load.image(card.backingCard.cardTitle + "-hover", cardNameToUrl(card.backingCard.cardTitle))
    })
}
