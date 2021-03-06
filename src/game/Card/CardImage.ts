import Phaser from "phaser"
import ImageKey from "../ImageKey"
import { CARD_HEIGHT, CARD_WIDTH, } from "../constants"
import { KCard } from "../../shared/keyforge/card/KCard"

class CardImage extends Phaser.GameObjects.Container {

    cardImage: Phaser.GameObjects.Image
    interactiveZone: Phaser.GameObjects.Rectangle
    blueGlow: Phaser.GameObjects.Image
    orangeGlow: Phaser.GameObjects.Image
    greenGlow: Phaser.GameObjects.Image
    maverick: Phaser.GameObjects.Image
    legacy: Phaser.GameObjects.Image
    maverickHouse: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number, public card: KCard, public back: string = "cardback", public faceup: boolean = true) {
        super(scene, x, y)
        this.cardImage = new Phaser.GameObjects.Image(scene, 0, 0, card.keyforgeId)
        this.interactiveZone = new Phaser.GameObjects.Rectangle(scene, 0, 0, CARD_WIDTH, CARD_HEIGHT)
        this.interactiveZone.setInteractive({ cursor: "pointer" })
        this.scene.input.setDraggable(this.interactiveZone)

        this.orangeGlow = new Phaser.GameObjects.Image(this.scene, 0, 0, ImageKey.ORANGE_CARD_GLOW)
        this.orangeGlow.setDisplaySize(CARD_WIDTH * 1.2, CARD_HEIGHT + CARD_WIDTH * 0.2)

        this.greenGlow = new Phaser.GameObjects.Image(this.scene, 0, 0, ImageKey.GREEN_CARD_GLOW)
        this.greenGlow.setDisplaySize(CARD_WIDTH * 1.2, CARD_HEIGHT + CARD_WIDTH * 0.2)

        this.blueGlow = new Phaser.GameObjects.Image(this.scene, 0, 0, ImageKey.BLUE_CARD_GLOW)
        this.blueGlow.setDisplaySize(CARD_WIDTH * 1.2, CARD_HEIGHT + CARD_WIDTH * 0.2)

        this.maverick = new Phaser.GameObjects.Image(this.scene, 0, 0, ImageKey.MAVERICK)
        this.maverick.setDisplaySize(CARD_WIDTH, CARD_HEIGHT)

        this.legacy = new Phaser.GameObjects.Image(this.scene, 0, 0, ImageKey.LEGACY)
        this.legacy.setDisplaySize(CARD_WIDTH, CARD_HEIGHT)

        scene.load.image(card.house, require(`../../images/card/${card.house}.png`))
        this.maverickHouse = new Phaser.GameObjects.Image(this.scene, 0, 0, card.house)
        this.maverickHouse.setDisplaySize(CARD_WIDTH, CARD_HEIGHT)
    }

    render() {
        if (!this.faceup) {
            this.cardImage.setTexture(this.back)
        }

        this.orangeGlow.setAlpha(0)
        this.add(this.orangeGlow)

        this.greenGlow.setAlpha(0)
        this.add(this.greenGlow)

        this.blueGlow.setAlpha(0)
        this.add(this.blueGlow)

        this.cardImage.setDisplaySize(CARD_WIDTH, CARD_HEIGHT)
        this.add(this.cardImage)

        if (this.card.maverick) {
            this.add(this.maverickHouse)
            this.add(this.maverick)
        }

        if (this.card.legacy) {
            this.add(this.legacy)
        }

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
