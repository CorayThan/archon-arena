import { CardInGame } from "../shared/gamestate/CardInGame"
import Phaser from "phaser"
import Card from "./Card"
import GameScene from "./GameScene"

class Prompt {

    done: boolean
    selection: CardInGame[]
    cursor: Phaser.GameObjects.Image | undefined

    constructor(private validTargets: CardInGame[], private numTargets: number) {
        this.selection = []
        this.done = false
    }

    async addToScene(scene: GameScene) {
        const text = this.numTargets > 1 ? `Choose ${this.numTargets} targets` : "Choose a target"
        const textElement = new Phaser.GameObjects.Text(scene, 10, scene.height / 2 - 100, text, {
            color: "#fff",
            backgroundColor: "#555",
            fontSize: "30px",
            padding: {
                left: 5,
                right: 5,
                top: 5,
                bottom: 5,
            },
        })
        scene.root!.add(textElement)

        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                if (this.done) {
                    clearInterval(interval)
                    resolve(this.selection)
                }
            }, 100)
        })
    }

    onClickCard(cardData: CardInGame, cardUIElement: Card) {
        if (this.selection.length === this.numTargets)
            return

        if (this.selection.includes(cardData)) {
            this.selection = this.selection.filter(c => c !== cardData)
            cardUIElement.cardImage.blueGlow.setAlpha(0)
            return
        }

        if (this.validTargets.includes(cardData)) {
            this.selection.push(cardData)
            cardUIElement.cardImage.blueGlow.setAlpha(1)

            if (this.selection.length === this.numTargets) {
                setTimeout(() => {
                    this.done = true
                }, 1000)
            }
        }
    }

    onMouseOverCard(cardData: CardInGame, cardUIElement: Card) {}
    onMouseOutCard(cardData: CardInGame, cardUIElement: Card) {}
    onMouseMove(pointer: Phaser.Input.Pointer) {}
}

export default Prompt
