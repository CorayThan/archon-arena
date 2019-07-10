import Phaser from "phaser"

export default interface CardInHand {
    name: string,
    id: string,
}

// Hey Grant, not sure where you want these functions. I thought this file seemed right. Feel free to move them
const cardNameReplacementRegex = /[^\d\w\s]/g
const spaceRegex = /\s/g
const cardNameToCardNameKey = (name: string) => {
    return name.replace(cardNameReplacementRegex, "")
        .replace(spaceRegex, "-")
        .toLowerCase()
}
const cardNameToUrl = (name: string) => `https://keyforge-card-images.s3-us-west-2.amazonaws.com/card-imgs/${cardNameToCardNameKey(name)}.png`

// Loads cards from an amazon S3 bucket I set up with 1 year caching and CORS
export const preloadCardsInPhaser = (scene: Phaser.Scene, cards: {name: string}[]) => {
    cards.forEach(card => scene.load.image(cardNameToCardNameKey(card.name), cardNameToUrl(card.name)))
}
