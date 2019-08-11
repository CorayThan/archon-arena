import Phaser from "phaser"
import GameScene from "./GameScene"
import Card from "./Card"
import { getCardType } from "./StateUtils"
import {
    CARD_HEIGHT,
    CARD_WIDTH,
} from "./constants"
import ImageKey from "./ImageKey"

const width = CARD_WIDTH * 0.7
const height = CARD_HEIGHT * 0.7

class CardDropZone {

    zone: Phaser.GameObjects.Zone
    image: Phaser.GameObjects.Image
    visible: boolean
    allowCardTypes: string[]
    getCardImage: Function
    getMinimumAlpha: Function

    constructor(private scene: GameScene, public id: string, public x: number, public y: number, private onDrop?: Function, onClick?: Function) {
        this.visible = true
        this.allowCardTypes = []
        this.getCardImage = () => ImageKey.CARDBACK
        this.getMinimumAlpha = () => 0.7
        this.zone = new Phaser.GameObjects.Zone(scene, x, y, width, height)
        this.image = new Phaser.GameObjects.Image(scene, this.zone.x, this.zone.y, this.getCardImage())
        if (onClick) {
            this.zone.addListener("pointerup", onClick)
        }
    }

    render() {
        if (this.image) {
            this.image.destroy()
        }

        this.image = new Phaser.GameObjects.Image(this.scene, this.zone.x, this.zone.y, this.getCardImage())
        this.image.setDisplaySize(width, height)
        this.zone.setRectangleDropZone(width, height)

        this.zone.setDataEnabled()
        // @ts-ignore
        this.zone.data.set({
            onEnter: (card: Card) => {
                const cardId = card.id
                const cardType = getCardType(this.scene.state, cardId)
                if (this.allowCardTypes.includes(cardType)) {
                    this.image!.setAlpha(1)
                }
            },
            onLeave: () => {
                this.image!.setAlpha(this.getMinimumAlpha())
            },
            onDrop: (droppedCard: Card) => {
                const cardType = getCardType(this.scene.state, droppedCard.id)
                if (!this.allowCardTypes.includes(cardType)) {
                    return
                }
                if (this.onDrop)
                    this.onDrop(droppedCard)
            }
        })
        this.zone.name = this.id
        this.zone.data.get("onLeave")()

        this.scene.root!.add(this.zone)
        if (this.visible) {
            this.scene.root!.add(this.image)
            this.scene.root!.sendToBack(this.image)
        }
        this.scene.root!.sendToBack(this.zone)
    }
}

export default CardDropZone
