import Phaser from "phaser"
import { KCard } from "../../shared/keyforge/card/KCard"
import { CardInGame } from "../../shared/gamestate/CardInGame"
import ImageKey from "../ImageKey"

import CardImage from "./CardImage"
import SmallCardImage from "../SmallCard/SmallCardImage"
import { CARD_HEIGHT, CARD_WIDTH, SMALL_CARD_HEIGHT, SMALL_CARD_WIDTH } from "../constants"

export interface CardInput {
    scene: Phaser.Scene,
    cardImage?: CardImage | SmallCardImage,
    x: number,
    y: number,
    width?: number,
    height?: number,
    id: string,
    front: ImageKey | string,
    back: ImageKey | string,
    faceup?: boolean,
    ready?: boolean,
    draggable?: boolean,
    cardsUnderneath?: CardInGame[],
    upgrades?: CardInGame[],
    backingCard: KCard,
    onClick: Function,
    onMouseOver: Function,
    onMouseOut: Function,
    onDragEnd?: Function,
    onDragStart?: Function,
    onMouseOverUpgrade?: Function,
    onMouseOutUpgrade?: Function,
}

class Card extends Phaser.GameObjects.Container {

    id: string
    _originX: number
    _originY: number
    front: ImageKey | string
    back: ImageKey | string
    ready: boolean
    faceup: boolean
    tokens: {
        [key: string]: number
    }
    ignoreNextPointerUp: boolean
    scene: Phaser.Scene
    cardImage: CardImage | SmallCardImage
    upgrades: CardImage[] | SmallCardImage[]
    cardsUnderneath: Phaser.GameObjects.Image[]
    backingCard: KCard
    tweens: Phaser.Tweens.Tween[]

    constructor({
        scene,
        cardImage,
        x,
        y,
        width = SMALL_CARD_WIDTH,
        height = SMALL_CARD_HEIGHT,
        id,
        front,
        back,
        faceup = true,
        ready = true,
        draggable = false,
        cardsUnderneath = [],
        upgrades = [],
        backingCard,
        onClick,
        onMouseOver,
        onMouseOut,
        onDragEnd,
        onDragStart = () => {},
        onMouseOverUpgrade = () => {},
        onMouseOutUpgrade = () => {},
    }: CardInput) {
        super(scene)
        this.scene = scene
        this.ignoreNextPointerUp = false

        this._originX = x
        this._originY = y
        this.width = width
        this.height = height
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
        this.backingCard = backingCard
        this.tweens = []

        this.cardImage = cardImage!
        this.add(this.cardImage)

        this.cardsUnderneath = cardsUnderneath.map(() => {
            return new Phaser.GameObjects.Image(scene, 0, 0, back)
        })

        this.upgrades = upgrades.map((card: CardInGame) => {
            const cardImage = new SmallCardImage(scene, 0, 0, card.id, card.backingCard.house, card.backingCard.maverick)
            cardImage.setDataEnabled()
            // @ts-ignore
            cardImage.id = card.id
            cardImage.interactiveZone.setInteractive({ cursor: "pointer" })
            this.scene.input.setDraggable(cardImage.interactiveZone)
            cardImage.interactiveZone.addListener("pointerover", (e: MouseEvent) => {
                onMouseOverUpgrade(e, { data: { get: () => card.backingCard.cardTitle } })
            })
            cardImage.interactiveZone.addListener("pointerout", () => {
                onMouseOutUpgrade()
            })
            cardImage.interactiveZone.addListener("drag", (pointer: Phaser.Input.Pointer, x: number, y: number) => {
                cardImage.setPosition(x, y - 20)
            })
            cardImage.interactiveZone.addListener("dragstart", (pointer: Phaser.Input.Pointer) => {
                onDragStart(card, pointer)
            })
            cardImage.interactiveZone.addListener("dragend", () => {
                this.render()
            })
            cardImage.interactiveZone.addListener("dragenter", (pointer: Phaser.Input.Pointer, zone: Phaser.GameObjects.Zone) => {
                zone.data.get("onEnter")(cardImage)
            })
            cardImage.interactiveZone.addListener("dragleave", (pointer: Phaser.Input.Pointer, zone: Phaser.GameObjects.Zone) => {
                zone.data.get("onLeave")(cardImage)
            })
            cardImage.interactiveZone.addListener("drop", (pointer: Phaser.Input.Pointer, zone: Phaser.GameObjects.Zone) => {
                zone.data.get("onDrop")(cardImage)
            })
            return cardImage
        })

        this.cardImage.interactiveZone.addListener("pointerup", (pointer: Phaser.Input.Pointer) => {
            if (this.ignoreNextPointerUp) {
                this.ignoreNextPointerUp = false
            } else {
                onClick(pointer.event, this)
            }
        })

        this.cardImage.interactiveZone.addListener("pointerover", (e: MouseEvent) => {
            onMouseOver(e, this)
        })

        this.cardImage.interactiveZone.addListener("pointerout", () => {
            onMouseOut()
        })

        if (draggable) {
            let overDropZone = false

            this.cardImage.interactiveZone.addListener("drag", (pointer: Phaser.Input.Pointer) => {
                this.setAngle(0)
                this.setPosition(pointer.x, pointer.y)
                this.ignoreNextPointerUp = true

                const distY = this._originY - this.y
                if (!overDropZone) {
                    if (distY > CARD_HEIGHT / 2) {
                        this.removeTweens()
                        this.tweenAlpha(this.cardImage.blueGlow, 0)
                        this.tweenAlpha(this.cardImage.greenGlow, 1)
                        this.tweenAlpha(this.cardImage.orangeGlow, 0)
                    } else {
                        this.removeTweens()
                        this.tweenAlpha(this.cardImage.blueGlow, 0)
                        this.tweenAlpha(this.cardImage.greenGlow, 0)
                        this.tweenAlpha(this.cardImage.orangeGlow, 0)
                    }
                }
            })

            this.cardImage.interactiveZone.addListener("dragstart", (pointer: Phaser.Input.Pointer) => {
                // @ts-ignore
                this.scene.root.bringToTop(this)
                onDragStart(this, pointer)
            })

            this.cardImage.interactiveZone.addListener("dragend", () => {
                if (onDragEnd) {
                    onDragEnd(this)
                } else {
                    this.render()
                }
            })

            this.cardImage.interactiveZone.addListener("dragenter", (pointer: Phaser.Input.Pointer, zone: Phaser.GameObjects.Zone) => {
                if (zone.name === "upgrade") {
                    this.removeTweens()
                    this.tweenAlpha(this.cardImage.blueGlow, 0)
                    this.tweenAlpha(this.cardImage.greenGlow, 0)
                    this.tweenAlpha(this.cardImage.orangeGlow, 1)
                    overDropZone = true
                } else if (zone.name !== "hand") {
                    this.removeTweens()
                    this.tweenAlpha(this.cardImage.blueGlow, 0)
                    this.tweenAlpha(this.cardImage.greenGlow, 0)
                    this.tweenAlpha(this.cardImage.orangeGlow, 1)
                    overDropZone = true
                }
                zone.data.get("onEnter")(this)
            })

            this.cardImage.interactiveZone.addListener("dragleave", (pointer: Phaser.Input.Pointer, zone: Phaser.GameObjects.Zone) => {
                overDropZone = false
                zone.data.get("onLeave")(this)
            })

            this.cardImage.interactiveZone.addListener("drop", (pointer: Phaser.Input.Pointer, zone: Phaser.GameObjects.Zone) => {
                zone.data.get("onDrop")(this)
            })
        }

        this.render()
    }

    render() {
        this.removeAll()

        this.setPosition(this._originX, this._originY)
        this.setDisplaySize(this.width, this.height)

        this.cardImage.render()
        this.add(this.cardImage)

        this.upgrades.forEach((card: CardImage | SmallCardImage, i: number) => {
            card.setPosition(0, (i + 1) * -20)
            card.render()
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
        this.renderTokens()
    }

    renderTokens() {
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
                    const text = new Phaser.GameObjects.Text(this.scene, position[0], position[1], "" + tokenData[tokenType], {
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
    }

    removeTweens() {
        this.tweens.forEach((tween: Phaser.Tweens.Tween) => {
            tween.remove()
        })
        this.tweens = []
    }

    tweenAlpha(target: Phaser.GameObjects.Image, value: number) {

        const duplicateTween = this.tweens.find((tween: Phaser.Tweens.Tween) => tween.targets[0] === target)
        if (duplicateTween) {
            return
        }

        const tween = this.scene.tweens.add({
            targets: target,
            alpha: value,
            duration: 200,
            ease: "Quad.easeOut",
        })

        this.tweens.push(tween)
    }

    destroy() {
        this.cardImage.destroy()
        this.cardsUnderneath.forEach((image: Phaser.GameObjects.Image) => image.destroy())
        this.upgrades.forEach((image: CardImage | SmallCardImage) => image.destroy())
    }
}

export default Card
