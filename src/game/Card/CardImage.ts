import Phaser from "phaser"
import {
    CARD_WIDTH,
    CARD_HEIGHT,
} from "../constants"

class CardImage extends Phaser.GameObjects.Container {

    cardImage: Phaser.GameObjects.Image
    interactiveZone: Phaser.GameObjects.Rectangle

    constructor(scene: Phaser.Scene, x: number, y: number, public back: string, public front: string = "cardback", public faceup: boolean = true) {
        super(scene, x, y)
        this.cardImage = new Phaser.GameObjects.Image(scene, 0, 0, back)
        this.interactiveZone = new Phaser.GameObjects.Rectangle(scene, 0, 0, CARD_WIDTH, CARD_HEIGHT)
        this.interactiveZone.setInteractive({ cursor: "pointer" })
        this.scene.input.setDraggable(this.interactiveZone)
    }

    render() {
        if (this.faceup) {
            this.cardImage.setTexture(this.front)
        }

        this.cardImage.setDisplaySize(CARD_WIDTH, CARD_HEIGHT)
        this.add(this.cardImage)

        this.interactiveZone.setPosition(0, 0)
        this.interactiveZone.setSize(CARD_WIDTH, CARD_HEIGHT)
        this.add(this.interactiveZone)
    }

    destroy() {
        this.cardImage.destroy()
        this.interactiveZone.destroy()
    }
}

export default CardImage
