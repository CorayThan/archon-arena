import BaseCard, { CardInput } from "../Card/BaseCard"
import SmallCardImage from "./SmallCardImage"
import { SMALL_CARD_HEIGHT, SMALL_CARD_WIDTH } from "../constants"

class SmallCard extends BaseCard {

    constructor(data: CardInput) {
        data.cardImage = new SmallCardImage(data.scene, 0, 0, data.id, data.backingCard.house, data.backingCard.maverick, data.back, data.faceup!)
        data.width = SMALL_CARD_WIDTH
        data.height = SMALL_CARD_HEIGHT
        super(data)
    }

    renderTokens() {

        if (this.backingCard.cardType === "Creature") {
            const powerX = -SMALL_CARD_WIDTH / 2 + 10
            const powerY = SMALL_CARD_HEIGHT / 2 - 5
            const powerTexture = this.tokens.power > 0 ? "enhanced-card-power" : "card-power"
            const powerImage = new Phaser.GameObjects.Image(this.scene, powerX, powerY, powerTexture)
            powerImage.setOrigin(0.5)
            powerImage.setDisplaySize(30, 30)
            this.add(powerImage)

            let power = this.backingCard.power
            if (this.tokens.power) {
                power += this.tokens.power
            }
            power = Math.max(0, power)

            const powerText = new Phaser.GameObjects.Text(this.scene, powerX, powerY, '' + power, {
                color: "#fff",
                stroke: "#000",
                strokeThickness: 4,
                fontSize: "18px"
            })
            powerText.setOrigin(0.5)
            this.add(powerText)

            const armorX = SMALL_CARD_WIDTH / 2 - 10
            const armorY = SMALL_CARD_HEIGHT / 2 - 5
            const armor = new Phaser.GameObjects.Image(this.scene, armorX, armorY, "armor-token")
            armor.setOrigin(0.5)
            armor.setDisplaySize(30, 30)
            this.add(armor)

            const armorText = new Phaser.GameObjects.Text(this.scene, armorX, armorY, '~', {
                color: "#fff",
                stroke: "#000",
                strokeThickness: 4,
                fontSize: "18px"
            })
            armorText.setOrigin(0.5)
            this.add(armorText)
        }

        const tokenPositions = [
            [
                this.cardImage.x,
                this.cardImage.y
            ],
            [
                this.cardImage.x - (SMALL_CARD_WIDTH * 0.2),
                this.cardImage.y,
                this.cardImage.x + (SMALL_CARD_WIDTH * 0.2),
                this.cardImage.y,
            ],
            [
                this.cardImage.x - (SMALL_CARD_WIDTH * 0.2),
                this.cardImage.y - (SMALL_CARD_HEIGHT * 0.2),
                this.cardImage.x + (SMALL_CARD_WIDTH * 0.2),
                this.cardImage.y - (SMALL_CARD_HEIGHT * 0.2),
                this.cardImage.x - (SMALL_CARD_WIDTH * 0.2),
                this.cardImage.y + (SMALL_CARD_HEIGHT * 0.2),
                this.cardImage.x + (SMALL_CARD_WIDTH * 0.2),
                this.cardImage.y + (SMALL_CARD_HEIGHT * 0.2),
            ],
            [
                this.cardImage.x - (SMALL_CARD_WIDTH * 0.2),
                this.cardImage.y - (SMALL_CARD_WIDTH * 0.4),
                this.cardImage.x + (SMALL_CARD_WIDTH * 0.2),
                this.cardImage.y - (SMALL_CARD_WIDTH * 0.4),
                this.cardImage.x - (SMALL_CARD_WIDTH * 0.2),
                this.cardImage.y,
                this.cardImage.x + (SMALL_CARD_WIDTH * 0.2),
                this.cardImage.y,
            ],
            [
                this.cardImage.x - (SMALL_CARD_WIDTH * 0.2),
                this.cardImage.y - (SMALL_CARD_WIDTH * 0.4),
                this.cardImage.x + (SMALL_CARD_WIDTH * 0.2),
                this.cardImage.y - (SMALL_CARD_WIDTH * 0.4),
                this.cardImage.x - (SMALL_CARD_WIDTH * 0.2),
                this.cardImage.y,
                this.cardImage.x + (SMALL_CARD_WIDTH * 0.2),
                this.cardImage.y,
                this.cardImage.x - (SMALL_CARD_WIDTH * 0.2),
                this.cardImage.y + (SMALL_CARD_WIDTH * 0.4),
            ]
        ]

        const tokens = Object.keys(this.tokens)
            .filter(key => this.tokens[key] > 0)
            .filter(key => key !== "power")
        tokens.forEach((tokenType, i) => {
            if (this.tokens[tokenType] > 0) {
                const position = tokenPositions[tokens.length - 1].slice(i * 2)
                const token = new Phaser.GameObjects.Image(this.scene, position[0], position[1], `${tokenType}-token`)
                token.setDisplaySize(SMALL_CARD_WIDTH * 0.3, SMALL_CARD_WIDTH * 0.3)
                this.add(token)

                if (tokenType !== "stun" && tokenType !== "doom") {
                    const text = new Phaser.GameObjects.Text(this.scene, position[0], position[1], '' + this.tokens[tokenType], {
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
}

export default SmallCard
