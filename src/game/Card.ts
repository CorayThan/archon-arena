import Phaser from "phaser"
import { CardInGame } from "../shared/gamestate/CardInGame"

export const CARD_WIDTH = 90
export const CARD_HEIGHT = CARD_WIDTH / .716612378

class Card extends Phaser.GameObjects.Container {

    id: string
    _originX: number
    _originY: number
    front: string
    back: string
    ready: boolean
    faceup: boolean
    tokens: {
        [key: string]: number
    }
    ignoreNextPointerUp: boolean
    scene: Phaser.Scene
    cardImage: Phaser.GameObjects.Image
    upgrades: Phaser.GameObjects.Image[]
    cardsUnderneath: Phaser.GameObjects.Image[]

    constructor({
        scene,
        x,
        y,
        id,
        front,
        back,
        faceup = true,
        ready = true,
        draggable = false,
        cardsUnderneath = [],
        upgrades = [],
        onClick,
        onMouseOver,
        onMouseOut,
        onDragEnd,
        onDragStart = () => {},
        onMouseOverUpgrade = () => {},
        onMouseOutUpgrade = () => {},
    }: {
        scene: Phaser.Scene,
        x: number,
        y: number,
        id: string,
        front: string,
        back: string,
        faceup?: boolean,
        ready?: boolean,
        draggable?: boolean,
        cardsUnderneath?: CardInGame[],
        upgrades?: CardInGame[],
        onClick: Function,
        onMouseOver: Function,
        onMouseOut: Function,
        onDragEnd?: Function,
        onDragStart?: Function,
        onMouseOverUpgrade?: Function,
        onMouseOutUpgrade?: Function,
    }) {
        super(scene)
        this.scene = scene
        this.ignoreNextPointerUp = false

        this._originX = x
        this._originY = y
        this.id = id
        this.front = front
        this.back = back
        this.ready = ready
        this.faceup = faceup
        this.tokens = {
            amber: 0,
            damage: 0,
            armor: 0,
            power: 0,
            stun: 0,
            doom: 0,
        }

        this.cardImage = new Phaser.GameObjects.Image(scene, 0, 0, back)
        this.add(this.cardImage)

        this.cardsUnderneath = cardsUnderneath.map(() => {
            const cardImage = new Phaser.GameObjects.Image(scene, 0, 0, back)
            return cardImage
        })

        this.upgrades = upgrades.map((card: CardInGame, i: number) => {
            const cardImage = new Phaser.GameObjects.Image(scene, 0, 0, card.id)
            cardImage.setDataEnabled()
            // @ts-ignore
            cardImage.id = `${id}-upgrade-${i}`
            cardImage.setInteractive({ cursor: "pointer" })
            this.scene.input.setDraggable(cardImage)
            cardImage.addListener("pointerover", (e: MouseEvent) => {
                onMouseOverUpgrade(e, { data: { get: () => card.id }})
            })
            cardImage.addListener("pointerout", () => {
                onMouseOutUpgrade()
            })
            cardImage.addListener("drag", (pointer: Phaser.Input.Pointer, x: number, y: number) => {
                cardImage.setPosition(x, y)
            })
            cardImage.addListener("dragstart", () => {
                onDragStart()
            })
            cardImage.addListener("dragend", () => {
                this.render()
            })
            cardImage.addListener("dragenter", (pointer: Phaser.Input.Pointer, zone: Phaser.GameObjects.Zone) => {
                zone.data.get("onEnter")(cardImage)
            })
            cardImage.addListener("dragleave", (pointer: Phaser.Input.Pointer, zone: Phaser.GameObjects.Zone) => {
                zone.data.get("onLeave")(cardImage)
            })
            cardImage.addListener("drop", (pointer: Phaser.Input.Pointer, zone: Phaser.GameObjects.Zone) => {
                zone.data.get("onDrop")(cardImage)
            })
            return cardImage
        })

        this.cardImage.addListener("pointerup", (pointer: Phaser.Input.Pointer) => {
            if (this.ignoreNextPointerUp) {
                this.ignoreNextPointerUp = false
            } else {
                onClick(pointer.event, this)
            }
        })

        this.cardImage.addListener("pointerover", (e: MouseEvent) => {
            onMouseOver(e, this)
        })

        this.cardImage.addListener("pointerout", () => {
            onMouseOut()
        })

        if (draggable) {
            this.cardImage.addListener("drag", (pointer: Phaser.Input.Pointer, x: number, y: number) => {
                this.setAngle(0)
                this.setPosition(this._originX + x, this._originY + y)
                this.ignoreNextPointerUp = true
            })

            this.cardImage.addListener("dragstart", () => {
                onDragStart()
            })

            this.cardImage.addListener("dragend", () => {
                if (onDragEnd) {
                    onDragEnd(this)
                } else {
                    this.render()
                }
            })

            this.cardImage.addListener("dragenter", (pointer: Phaser.Input.Pointer, zone: Phaser.GameObjects.Zone) => {
                zone.data.get("onEnter")(this)
            })

            this.cardImage.addListener("dragleave", (pointer: Phaser.Input.Pointer, zone: Phaser.GameObjects.Zone) => {
                zone.data.get("onLeave")(this)
            })

            this.cardImage.addListener("drop", (pointer: Phaser.Input.Pointer, zone: Phaser.GameObjects.Zone) => {
                zone.data.get("onDrop")(this)
            })
        }

        this.render()
    }

    render() {
        this.removeAll()

        if (this.faceup) {
            this.cardImage.setTexture(this.front)
        }

        this.cardImage.setDisplaySize(CARD_WIDTH, CARD_HEIGHT)
        this.add(this.cardImage)

        this.upgrades.forEach((card: Phaser.GameObjects.Image, i: number) => {
            card.setPosition(this.cardImage.x, this.cardImage.y - (CARD_HEIGHT * 0.15) * (i + 1))
            card.setDisplaySize(CARD_WIDTH, CARD_HEIGHT)
            this.add(card)
            this.sendToBack(card)
        })

        this.cardsUnderneath.forEach((card: Phaser.GameObjects.Image) => {
            card.setPosition(this.cardImage.x + (CARD_WIDTH * 0.1), this.cardImage.y + (CARD_WIDTH * 0.1))
            card.setDisplaySize(CARD_WIDTH, CARD_HEIGHT)
            this.add(card)
            this.sendToBack(card)
        })

        if (!this.ready) {
            this.setAngle(90)
        }
        this.setPosition(this._originX, this._originY)
        this.cardImage.setInteractive({ cursor: "pointer" })
        this.scene.input.setDraggable(this.cardImage)

        const tokenPositions = [
            [this.cardImage.x, this.cardImage.y - (CARD_WIDTH * 0.2)],
            [this.cardImage.x - (CARD_WIDTH * 0.2), this.cardImage.y - (CARD_WIDTH * 0.2), this.cardImage.x + (CARD_WIDTH * 0.2), this.cardImage.y - (CARD_WIDTH * 0.2)],
            [
                this.cardImage.x - (CARD_WIDTH * 0.2),
                this.cardImage.y - (CARD_WIDTH * 0.4),
                this.cardImage.x + (CARD_WIDTH * 0.2),
                this.cardImage.y - (CARD_WIDTH * 0.4),
                this.cardImage.x - (CARD_WIDTH * 0.2),
                this.cardImage.y,
                this.cardImage.x + (CARD_WIDTH * 0.2),
                this.cardImage.y,
            ],
            [
                this.cardImage.x - (CARD_WIDTH * 0.2),
                this.cardImage.y - (CARD_WIDTH * 0.4),
                this.cardImage.x + (CARD_WIDTH * 0.2),
                this.cardImage.y - (CARD_WIDTH * 0.4),
                this.cardImage.x - (CARD_WIDTH * 0.2),
                this.cardImage.y,
                this.cardImage.x + (CARD_WIDTH * 0.2),
                this.cardImage.y,
            ],
            [
                this.cardImage.x - (CARD_WIDTH * 0.2),
                this.cardImage.y - (CARD_WIDTH * 0.4),
                this.cardImage.x + (CARD_WIDTH * 0.2),
                this.cardImage.y - (CARD_WIDTH * 0.4),
                this.cardImage.x - (CARD_WIDTH * 0.2),
                this.cardImage.y,
                this.cardImage.x + (CARD_WIDTH * 0.2),
                this.cardImage.y,
                this.cardImage.x - (CARD_WIDTH * 0.2),
                this.cardImage.y + (CARD_WIDTH * 0.4),
            ],
            [
                this.cardImage.x - (CARD_WIDTH * 0.2),
                this.cardImage.y - (CARD_WIDTH * 0.4),
                this.cardImage.x + (CARD_WIDTH * 0.2),
                this.cardImage.y - (CARD_WIDTH * 0.4),
                this.cardImage.x - (CARD_WIDTH * 0.2),
                this.cardImage.y,
                this.cardImage.x + (CARD_WIDTH * 0.2),
                this.cardImage.y,
                this.cardImage.x - (CARD_WIDTH * 0.2),
                this.cardImage.y + (CARD_WIDTH * 0.4),
                this.cardImage.x + (CARD_WIDTH * 0.2),
                this.cardImage.y + (CARD_WIDTH * 0.4),
            ]
        ]

        const tokenData = this.tokens
        const tokens = Object.keys(tokenData).filter(key => tokenData[key] > 0)
        tokens.forEach((tokenType, i) => {
            if (tokenData[tokenType] > 0) {
                const position = tokenPositions[tokens.length - 1].slice(i * 2)
                const token = new Phaser.GameObjects.Image(this.scene, position[0], position[1], `${tokenType}-token`)
                token.setDisplaySize(CARD_WIDTH * 0.3, CARD_WIDTH * 0.3)
                this.add(token)

                if (tokenType !== "stun" && tokenType !== "doom") {
                    const text = new Phaser.GameObjects.Text(this.scene, position[0], position[1], ''+tokenData[tokenType], {
                        color: "#fff",
                        stroke: "#000",
                        strokeThickness: 4,
                        fontSize: "16px"
                    })
                    text.setOrigin(0.5)
                    this.add(text)
                }
            }
        })
    }

    addToken(data: { type: string, amount: number }) {
        this.tokens[data.type] += data.amount
        this.render()
    }

    destroy() {
        this.cardImage.destroy()
        this.cardsUnderneath.forEach((image: Phaser.GameObjects.Image) => image.destroy())
        this.upgrades.forEach((image: Phaser.GameObjects.Image) => image.destroy())
    }
}

export default Card
