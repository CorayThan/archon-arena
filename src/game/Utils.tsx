import Phaser from "phaser"

const cardNameToUrl = (name: string) => `https://keyforge-card-images.s3-us-west-2.amazonaws.com/card-imgs/${name}.png`

export const preloadCardsInPhaser = (scene: Phaser.Scene, cards: {id: string}[]) => {
    cards.forEach((card: {id: string}) => {
        let id = card.id
        if (card.id === "arise!")
            id = "arise"
        scene.load.image(card.id, cardNameToUrl(id))
    })
}
