import Phaser from "phaser"
import ImageKey from "../ImageKey"
import {
    CARD_WIDTH,
    CARD_HEIGHT,
} from "../constants"

class CardImage extends Phaser.GameObjects.Container {

    cardImage: Phaser.GameObjects.Image
    interactiveZone: Phaser.GameObjects.Rectangle
    orangeGlow: Phaser.GameObjects.Image
    greenGlow: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number, public back: string, public front: string = "cardback", public faceup: boolean = true) {
        super(scene, x, y)
        this.cardImage = new Phaser.GameObjects.Image(scene, 0, 0, back)
        this.interactiveZone = new Phaser.GameObjects.Rectangle(scene, 0, 0, CARD_WIDTH, CARD_HEIGHT)
        this.interactiveZone.setInteractive({ cursor: "pointer" })
        this.scene.input.setDraggable(this.interactiveZone)

        this.orangeGlow = new Phaser.GameObjects.Image(this.scene, 0, 0, ImageKey.ORANGE_CARD_GLOW)
        this.orangeGlow.setDisplaySize(CARD_WIDTH * 1.2, CARD_HEIGHT + CARD_WIDTH * 0.2)

        this.greenGlow = new Phaser.GameObjects.Image(this.scene, 0, 0, ImageKey.GREEN_CARD_GLOW)
        this.greenGlow.setDisplaySize(CARD_WIDTH * 1.2, CARD_HEIGHT + CARD_WIDTH * 0.2)
    }

    render() {
        if (this.faceup) {
            this.cardImage.setTexture(this.front)
        }

        this.orangeGlow.setAlpha(0)
        this.add(this.orangeGlow)

        this.greenGlow.setAlpha(0)
        this.add(this.greenGlow)

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
