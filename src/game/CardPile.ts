import Phaser from "phaser"
import GameScene from "./GameScene"
import CardDropZone from "./CardDropZone"
import { CardInGame } from "../shared/gamestate/CardInGame"
import CardType from "./CardType"
import {
    CARD_HEIGHT,
    CARD_WIDTH,
    SMALL_CARD_WIDTH,
    SMALL_CARD_HEIGHT,
} from "./constants"

interface DropZoneOptions {
    onDrop?: Function,
    onClick?: Function,
    getCardImage?: Function,
    getMinimumAlpha?: Function,
    visible?: boolean,
    allowCardTypes?: CardType[],
}

class CardPile {

    dropZone: CardDropZone
    scene: GameScene
    x: number
    y: number
    name: string
    cards: CardInGame[]
    interactive: boolean
    text: Phaser.GameObjects.Text

    constructor({
        scene,
        x,
        y,
        name,
        cards,
        cardDropZoneOptions,
        interactive = true,
    }: {
        scene: GameScene,
        x: number,
        y: number,
        name: string,
        cards: CardInGame[],
        cardDropZoneOptions: DropZoneOptions,
        interactive?: boolean,
    }) {
        this.scene = scene
        this.x = x
        this.y = y
        this.name = name
        this.cards = cards
        this.interactive = interactive

        this.dropZone = new CardDropZone(scene, "", x, y, cardDropZoneOptions.onDrop, cardDropZoneOptions.onClick)
        this.dropZone.allowCardTypes = cardDropZoneOptions.allowCardTypes || [CardType.HAND]
        if (cardDropZoneOptions.getCardImage) {
            this.dropZone.getCardImage = cardDropZoneOptions.getCardImage
        }
        if (cardDropZoneOptions.getMinimumAlpha) {
            this.dropZone.getMinimumAlpha = cardDropZoneOptions.getMinimumAlpha
        }
        this.dropZone.visible = cardDropZoneOptions.visible !== undefined ? cardDropZoneOptions.visible : true

        this.text = new Phaser.GameObjects.Text(scene, x - CARD_WIDTH * 0.35, y - CARD_HEIGHT * 0.7 * 0.5, `${name} (${cards.length})`, {
            color: "#000",
            backgroundColor: "rgba(255, 255, 255, 1)",
            fontSize: "10px",
        })
    }

    render() {
        this.dropZone.render()
        this.scene.root!.add(this.text)
    }
}

export default CardPile
