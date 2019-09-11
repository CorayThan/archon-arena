import Phaser from "phaser"
import ImageKey from "./ImageKey"
import { KCard } from "../shared/keyforge/card/KCard"

export class CardImage extends Phaser.GameObjects.Container {
    cardImage: Phaser.GameObjects.Image
    maverick: Phaser.GameObjects.Image
    legacy: Phaser.GameObjects.Image
    maverickHouse: Phaser.GameObjects.Image
    width: number
    height: number
    _originX: number
    _originY: number

    constructor(scene: Phaser.Scene, width: number, height: number, public card: KCard) {
        super(scene)
        this.cardImage = new Phaser.GameObjects.Image(scene, 0, 0, card.keyforgeId)

        this.maverick = new Phaser.GameObjects.Image(this.scene, 0, 0, ImageKey.MAVERICK)
        this.maverick.setDisplaySize(width, height)
        this.legacy = new Phaser.GameObjects.Image(this.scene, 0, 0, ImageKey.LEGACY)
        this.legacy.setDisplaySize(width, height)

        scene.load.image(card.house, require(`../images/card/${card.house}.png`))
        this.maverickHouse = new Phaser.GameObjects.Image(this.scene, 0, 0, card.house)
        this.maverickHouse.setDisplaySize(width, height)
        this.width = width
        this.height = height
        this._originX = 0
        this._originY = 0
    }

    render() {
        this.cardImage.setDisplaySize(this.width, this.height)
        this.add(this.cardImage)
        if (this.card.maverick) {
            this.add(this.maverickHouse)
            this.add(this.maverick)
        }
        if (this.card.legacy) {
            this.add(this.legacy)
        }
    }

    destroy() {
        this.cardImage.destroy()
        this.maverickHouse.destroy()
        this.maverick.destroy()
        this.legacy.destroy()
    }
}