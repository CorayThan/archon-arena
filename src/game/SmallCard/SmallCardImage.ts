import Phaser from "phaser"
import ImageKey from "../ImageKey"
import {
    CARD_WIDTH,
    CARD_HEIGHT,
    SMALL_CARD_WIDTH,
    SMALL_CARD_HEIGHT
} from "../constants"

class CardImage extends Phaser.GameObjects.Container {

    cardImage: Phaser.GameObjects.Image
    backgroundImage: Phaser.GameObjects.Image
    interactiveZone: Phaser.GameObjects.Rectangle
    blueGlow: Phaser.GameObjects.Image
    orangeGlow: Phaser.GameObjects.Image
    greenGlow: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number, public back: string, public front: string = "cardback", public faceup: boolean = true) {
        super(scene, x, y)
        this.cardImage = new Phaser.GameObjects.Image(scene, 0, 0, back)
        this.backgroundImage = new Phaser.GameObjects.Image(this.scene, 0, 0, front)
        this.interactiveZone = new Phaser.GameObjects.Rectangle(scene, 0, 0, SMALL_CARD_WIDTH, SMALL_CARD_HEIGHT)
        this.interactiveZone.setInteractive({ cursor: "pointer" })
        this.scene.input.setDraggable(this.interactiveZone)
        this.greenGlow = new Phaser.GameObjects.Image(this.scene, 0, 0, ImageKey.GREEN_CARD_GLOW)
        this.orangeGlow = new Phaser.GameObjects.Image(this.scene, 0, 0, ImageKey.ORANGE_CARD_GLOW)
        this.blueGlow = new Phaser.GameObjects.Image(this.scene, 0, 0, ImageKey.BLUE_CARD_GLOW)
    }

    render() {
        if (this.faceup) {
            this.cardImage.setTexture(this.front)
        }

        this.cardImage.setDisplaySize(CARD_WIDTH, CARD_HEIGHT)
        this.cardImage.setPosition(0, SMALL_CARD_HEIGHT / 2 - CARD_HEIGHT * 0.05)
        const imageFrame = new Phaser.Geom.Rectangle(0, 0, SMALL_CARD_WIDTH / this.cardImage.scaleX, SMALL_CARD_HEIGHT / this.cardImage.scaleY)
        this.cardImage.setCrop(imageFrame)
        this.add(this.cardImage)

        this.backgroundImage.setDisplaySize(CARD_WIDTH, CARD_HEIGHT)
        this.backgroundImage.setCrop(0, (CARD_HEIGHT * 0.95) / this.cardImage.scaleY, CARD_WIDTH / this.cardImage.scaleX, (CARD_HEIGHT * 0.1) / this.cardImage.scaleY)
        this.backgroundImage.setY(-CARD_HEIGHT / 4 + CARD_HEIGHT * 0.05)
        this.add(this.backgroundImage)

        this.interactiveZone.setPosition(0, 0)
        this.interactiveZone.setSize(SMALL_CARD_WIDTH, SMALL_CARD_HEIGHT + CARD_HEIGHT * 0.05)
        this.add(this.interactiveZone)
    }

    destroy() {
        this.cardImage.destroy()
        this.backgroundImage.destroy()
        this.interactiveZone.destroy()
    }
}

export default CardImage
