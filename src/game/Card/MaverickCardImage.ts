import Phaser from "phaser"
import ImageKey from "../ImageKey"

export class MaverickCardImage extends Phaser.GameObjects.Container {
    cardImage: Phaser.GameObjects.Image
    maverick: Phaser.GameObjects.Image
    maverickHouse: Phaser.GameObjects.Image
    width: number
    height: number

    constructor(scene: Phaser.Scene, public id: string, width: number, height: number, public house: string, public isMaverick: boolean) {
        super(scene,)
        this.cardImage = new Phaser.GameObjects.Image(scene, 0, 0, id)

        this.maverick = new Phaser.GameObjects.Image(this.scene, 0, 0, ImageKey.MAVERICK)
        this.maverick.setDisplaySize(width, height)

        scene.load.image(house, require(`../../images/maverick/${house}.png`))
        this.maverickHouse = new Phaser.GameObjects.Image(this.scene, 0, 0, house)
        this.maverickHouse.setDisplaySize(width, height)
        this.width = width
        this.height = height
    }

    render() {
        this.cardImage.setDisplaySize(this.width, this.height)
        this.add(this.cardImage)
        if (this.isMaverick) {
            this.add(this.maverickHouse)
            this.add(this.maverick)
        }
    }

    destroy() {
        this.cardImage.destroy()
        if (this.isMaverick) {
            this.maverickHouse.destroy()
            this.maverick.destroy()
        }
    }
}