import Phaser from "phaser"

const defaultHeight = 40

class Button extends Phaser.GameObjects.Container {

    width: number
    height: number
    text: Phaser.GameObjects.Text
    background: Phaser.GameObjects.Rectangle

    constructor(scene: Phaser.Scene, text: string, onClick: Function) {
        super(scene, 0, 0)

        this.width = text.length * 20 + 14
        this.height = defaultHeight

        this.background = new Phaser.GameObjects.Rectangle(scene, 0, 0, this.width, this.height, 0x555555)
        this.background.setInteractive({ cursor: "pointer" })
        this.background.addListener("pointerup", onClick)

        this.text = new Phaser.GameObjects.Text(scene, -this.width / 2 - 3, -this.height / 2, text, {
            color: "#fff",
            stroke: "#000",
            strokeThickness: 4,
            fontSize: "28px",
            padding: {
                left: 10,
                top: 5,
            }
        })

        this.add(this.background)
        this.add(this.text)
    }
}

export default Button
