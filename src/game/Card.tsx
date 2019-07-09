import Phaser from "phaser"
import CardInHand from "./types/CardInHand"
import Upgrade from "./types/Upgrade"

export const CARD_WIDTH = 80
export const CARD_HEIGHT = CARD_WIDTH / .716612378

class Card extends Phaser.GameObjects.Container {

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
        cardsUnderneath?: CardInHand[],
        upgrades?: Upgrade[],
        onClick: Function,
        onMouseOver: Function,
        onMouseOut: Function,
        onDragEnd?: Function,
        onMouseOverUpgrade?: Function,
        onMouseOutUpgrade?: Function,
    }) {
        super(scene)
        this.scene = scene
        this.ignoreNextPointerUp = false

        this.setDataEnabled()
        // @ts-ignore // this method accepts 1 argument. TS is wrong.
        this.data.set({
            x,
            y,
            id,
            front,
            back,
            ready,
            faceup,
            tokens: {
                amber: 0,
                damage: 0,
                armor: 0,
                power: 0,
                stun: 0,
            },
        })

        this.cardImage = new Phaser.GameObjects.Image(scene, 0, 0, back)
        this.add(this.cardImage)

        this.cardsUnderneath = cardsUnderneath.map(() => {
            const cardImage = new Phaser.GameObjects.Image(scene, 0, 0, back)
            return cardImage
        })

        this.upgrades = upgrades.map((card: Upgrade, i: number) => {
            // @ts-ignore
            const cardImage = new Phaser.GameObjects.Image(scene, 0, 0, card.id)
            cardImage.setDataEnabled()
            const owner = id.split("-")[0]
            cardImage.data.set("id", `${id}-upgrade-${i}`)
            cardImage.setInteractive({ cursor: "pointer" })
            this.scene.input.setDraggable(cardImage)
            cardImage.addListener("pointerover", (e: MouseEvent) => {
                onMouseOverUpgrade(e, { data: { get: () => card.id }})
            })
            cardImage.addListener("pointerout", () => {
                onMouseOutUpgrade()
            })
            cardImage.addListener("drag", (pointer: any, x: number, y: number) => {
                cardImage.setPosition(x, y)
            })
            cardImage.addListener("dragend", (pointer: any, x: number, y: number) => {
                this.render()
            })
            cardImage.addListener("dragenter", (pointer: any, zone: any) => {
                zone.data.get("onEnter")(cardImage)
            })
            cardImage.addListener("dragleave", (pointer: any, zone: any) => {
                zone.data.get("onLeave")(cardImage)
            })
            cardImage.addListener("drop", (pointer: any, zone: any) => {
                zone.data.get("onDrop")(cardImage)
            })
            return cardImage
        })

        this.cardImage.addListener("pointerup", (e: any) => {
            if (this.ignoreNextPointerUp) {
                this.ignoreNextPointerUp = false
            } else {
                onClick(e.event, this)
            }
        })

        this.cardImage.addListener("pointerover", (e: MouseEvent) => {
            onMouseOver(e, this)
        })

        this.cardImage.addListener("pointerout", () => {
            onMouseOut()
        })

        if (draggable) {
            this.cardImage.addListener("drag", (pointer: any, x: number, y: number) => {
                this.setAngle(0)
                this.setPosition(this.data.get("x") + x, this.data.get("y") + y)
                this.ignoreNextPointerUp = true
            })

            this.cardImage.addListener("dragend", (pointer: any, x: number, y: number) => {
                if (onDragEnd) {
                    onDragEnd(this)
                } else {
                    this.render()
                }
            })

            this.cardImage.addListener("dragenter", (pointer: any, zone: any) => {
                zone.data.get("onEnter")(this)
            })

            this.cardImage.addListener("dragleave", (pointer: any, zone: any) => {
                zone.data.get("onLeave")(this)
            })

            this.cardImage.addListener("drop", (pointer: any, zone: any) => {
                zone.data.get("onDrop")(this)
            })
        }

        this.render()
    }

    render() {
        this.removeAll()

        if (this.data.get("faceup")) {
            this.cardImage.setTexture(this.data.get("front"))
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

        if (!this.data.get("ready")) {
            this.setAngle(90)
        }
        this.setPosition(this.data.get("x"), this.data.get("y"))
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
        ]

        const tokenData = this.data.get("tokens")
        const tokens = Object.keys(tokenData).filter(key => tokenData[key] > 0)
        tokens.forEach((type, i) => {
            // @ts-ignore // TODO
            if (tokenData[type] > 0) {
                const position = tokenPositions[tokens.length - 1].slice(i * 2)

                const token = new Phaser.GameObjects.Image(this.scene, position[0], position[1], `${type}-token`)
                token.setDisplaySize(CARD_WIDTH * 0.3, CARD_WIDTH * 0.3)
                this.add(token)

                if (type !== "stun") {
                    const text = new Phaser.GameObjects.Text(this.scene, position[0], position[1], tokenData[type], {
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
        // @ts-ignore // TODO figure out how to make typescript happy
        this.data.get("tokens")[data.type] += data.amount
        this.render()
    }

    destroy() {
        this.cardImage.destroy()
        this.cardsUnderneath.forEach((image: Phaser.GameObjects.Image) => image.destroy())
        this.upgrades.forEach((image: Phaser.GameObjects.Image) => image.destroy())
    }
}

export default Card
