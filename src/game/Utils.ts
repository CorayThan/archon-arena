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
        const cardName = card.backingCard.cardTitle
        const keyforgeId = card.backingCard.keyforgeId
        scene.load.image(keyforgeId, cardNameToUrl(cardName))
        scene.load.image(keyforgeId + "-hover", cardNameToUrl(cardName))
    })
}