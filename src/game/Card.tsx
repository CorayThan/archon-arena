import Phaser from "phaser"

const CARD_WIDTH = 80
const CARD_HEIGHT = CARD_WIDTH / .716612378

class Card extends Phaser.GameObjects.Container {

    scene: Phaser.Scene
    cardImage: Phaser.GameObjects.Image
    upgrades: Phaser.GameObjects.Image[]
    cardsUnderneath: Phaser.GameObjects.Image[]

    constructor({scene, x, y, id, front, back, faceup = true, ready = true, cardsUnderneath = [], upgrades = [], onClick, onMouseOver, onMouseOut}: any) {
        super(scene)
        this.scene = scene

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

        this.upgrades = upgrades.map((card: { id: string }) => {
            // @ts-ignore
            const cardImage = new Phaser.GameObjects.Image(scene, 0, 0, card.id)
            cardImage.setInteractive()
            cardImage.addListener("pointerover", function () {
                // @ts-ignore
                onMouseOver(this.frame.texture.key)
            })
            cardImage.addListener("pointerout", function () {
                // @ts-ignore
                onMouseOut(this.frame.texture.key)
            })
            return cardImage
        })

        this.cardImage.addListener("pointerup", (e: MouseEvent) => {
            onClick(this, e)
        })

        this.cardImage.addListener("pointerover", () => {
            onMouseOver(this.data.get("front"))
        })

        this.cardImage.addListener("pointerout", () => {
            onMouseOut()
        })

        this.render()
    }

    render() {
        this.removeAll()

        if (this.data.get("faceup")) {
            this.cardImage.setTexture(this.data.get("front"))
        }

        this.setSize(CARD_WIDTH, CARD_HEIGHT)
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
        this.cardImage.setInteractive({cursor: "pointer"})
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
}

export default Card
