import Phaser from "phaser"
import GameScene from "./GameScene"
import Button from "./Components/Button"
import { CardInGame } from "../shared/gamestate/CardInGame"
import { CARD_HEIGHT, CARD_WIDTH, } from "./constants"
import { CardImage } from "./CardImage"

const defaultNumFeaturedCards = 7

class CardWindow {

    scene: GameScene
    onClickCard: Function
    background: Phaser.GameObjects.Rectangle
    cardImages: CardImage[]
    closeBtn: Button
    scrollLeftBtn: Button
    scrollRightBtn: Button
    cardAtIndex: number

    constructor({ scene, cards, onClick }: {
        scene: GameScene,
        cards: CardInGame[],
        onClick: Function,
    }) {
        this.scene = scene
        this.onClickCard = onClick

        this.background = new Phaser.GameObjects.Rectangle(scene, 0, 0, scene.width, scene.height, 0x2C2C2C, 0.5)
        this.background.setOrigin(0)
        this.background.setInteractive()

        this.cardImages = cards.map((card, i) => {
            const image = new CardImage(scene, CARD_WIDTH, CARD_HEIGHT, card!.backingCard)
            image.setDisplaySize(CARD_WIDTH, CARD_HEIGHT)
            image.setInteractive({ cursor: "pointer" })
            image.addListener("pointermove", (pointer: Phaser.Input.Pointer) => {
                this.onMouseOverCard(image, pointer)
            })
            image.addListener("pointerout", () => {
                this.onMouseOutCard(image)
            })
            image.addListener("pointerup", () => {
                const card = cards[i]
                this.onClickCard(card, i)
            })
            image.render()
            return image
        })

        this.cardAtIndex = cards.length

        const buttonY = scene.height / 2 + CARD_HEIGHT * 0.8
        this.closeBtn = new Button(scene, "DONE", this.onClickCloseBtn.bind(this))
        this.closeBtn.setPosition(scene.width / 2 + this.closeBtn.width * 0.5, buttonY)

        this.scrollLeftBtn = new Button(scene, "<", this.onClickScrollLeftBtn.bind(this))
        this.scrollLeftBtn.setPosition(scene.width / 2 - this.scrollLeftBtn.width * 3 - 10, buttonY)

        this.scrollRightBtn = new Button(scene, ">", this.onClickScrollRightBtn.bind(this))
        this.scrollRightBtn.setPosition(scene.width / 2 - this.scrollRightBtn.width * 2, buttonY)

        this.scene.root!.add(this.background)
        this.scene.root!.add(this.closeBtn)

        if (cards.length > defaultNumFeaturedCards) {
            this.scene.root!.add(this.scrollLeftBtn)
            this.scene.root!.add(this.scrollRightBtn)
        } else {
            this.closeBtn.setPosition(scene.width / 2 - this.closeBtn.width / 2, buttonY)
        }
    }

    onClickCloseBtn() {
        this.destroy()
    }

    onClickScrollLeftBtn() {
        if (this.cardAtIndex > defaultNumFeaturedCards) {
            this.cardAtIndex -= 1
            this.render()
        }
    }

    onClickScrollRightBtn() {
        if (this.cardAtIndex < this.cardImages.length) {
            this.cardAtIndex += 1
            this.render()
        }
    }

    onMouseOverCard(image: CardImage, pointer: Phaser.Input.Pointer) {
        if (pointer.y < image.displayHeight * 0.5 + image.y - 30) {
            image.setPosition(image.x, image._originY - 20)
        }
        this.scene.root!.bringToTop(image)
    }

    onMouseOutCard(image: CardImage) {
        this.cardImages.forEach(image => {
            this.scene.root!.bringToTop(image)
        })
        image.setPosition(image.x, image._originY)
    }

    render() {
        this.cardImages.forEach(image => this.scene.root!.remove(image))

        const cardImages = this.cardImages.slice(0, this.cardAtIndex)
        const numFeaturedCards = Math.min(defaultNumFeaturedCards, cardImages.length)
        const windowWidth = CARD_WIDTH * numFeaturedCards / 2

        const minX = this.scene.width / 2 - windowWidth / 2
        const maxX = this.scene.width / 2 + windowWidth / 2

        cardImages.forEach((image, i) => {
            let x
            let y = this.scene.height / 2
            let cardOrder = ((i / cardImages.length) - 1) * -1
            cardOrder = cardOrder * cardImages.length
            this.scene.root!.add(image)

            if (cardOrder <= numFeaturedCards) {
                cardOrder = Math.abs(cardOrder - numFeaturedCards)
                x = (cardOrder / numFeaturedCards) * (maxX - minX) + minX
                y += Math.abs((cardOrder / numFeaturedCards) - 0.45) * CARD_HEIGHT * 0.2 - CARD_HEIGHT * 0.1
                const angle = numFeaturedCards === 1 ? 0 : cardOrder / numFeaturedCards * (40 - 20) - 10
                image.setAngle(angle)
            } else {
                x = this.scene.width / 2 - windowWidth / 2
                if (cardOrder === numFeaturedCards + 1) {
                    x += CARD_WIDTH * -0.05
                    y += CARD_HEIGHT * 0.05
                    image.setAngle(-20)
                } else if (cardOrder === numFeaturedCards + 2) {
                    x += CARD_WIDTH * -0.05
                    y += CARD_HEIGHT * 0.06
                    image.setAngle(-30)
                } else if (cardOrder === numFeaturedCards + 3) {
                    x += CARD_WIDTH * -0.08
                    y += CARD_HEIGHT * 0.05
                    image.setAngle(-25)
                } else {
                    x += CARD_WIDTH * -0.08
                    y += CARD_HEIGHT * 0.05
                    image.setAngle(-8)
                    this.scene.root!.sendToBack(image)
                }
            }
            image._originY = y
            image.setPosition(x, y)
        })

        cardImages.forEach(image => {
            this.scene.root!.bringToTop(image)
        })
    }

    destroy() {
        this.background.destroy()
        this.cardImages.forEach(image => image.destroy())
        this.closeBtn.destroy()
        this.scrollLeftBtn.destroy()
        this.scrollRightBtn.destroy()
    }
}

export default CardWindow
