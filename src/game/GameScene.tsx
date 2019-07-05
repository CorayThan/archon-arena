import Phaser from "phaser"
import amber from "../images/amber.png"
import armor from "../images/armor.png"

import cardback from "../images/cardback.jpg" // TODO load via HTTP request
import damage from "../images/damage.png"
import forgedKey from "../images/forgedkey.png"
import unforgedKey from "../images/unforgedkey.png"
import jargogle from "../images/jargogle.png"
import kelifiDragon from "../images/kelifi-dragon.jpg" // TODO
import mantleOfTheZealot from "../images/mantle-of-the-zealot.png"
import power from "../images/power.png"
import safePlace from "../images/safe-place.png"
import stun from "../images/stun.png"
import { log } from "../Utils"
import Card from "./Card"

const CARD_WIDTH = 80
const CARD_HEIGHT = CARD_WIDTH / .716612378

class GameScene extends Phaser.Scene {
    // @ts-ignore
    root: Phaser.GameObjects.Container
    // @ts-ignore
    cardHoverImage: Phaser.GameObjects.Image

    constructor() {
        super("GameScene")
    }

    preload() {
        this.load.image("cardback", cardback)
        this.load.image("kelifi-dragon", kelifiDragon)
        this.load.image("jargogle", jargogle)
        this.load.image("safe-place", safePlace)
        this.load.image("mantle-of-the-zealot", mantleOfTheZealot)
        this.load.image("unforged-key", unforgedKey)
        this.load.image("forged-key", forgedKey)
        this.load.image("damage-token", damage)
        this.load.image("amber-token", amber)
        this.load.image("stun-token", stun)
        this.load.image("armor-token", armor)
        this.load.image("power-token", power)
    }

    create() {
        this.root = this.add.container(0, 0)
        this.render()

        this.input.mouse.disableContextMenu()
        const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        spaceBar.on("up", () => {
            this.data.get("endTurn")()
            this.render()
        })
    }

    renderPlayerBoard(player: any, originX: number, originY: number, orientation: string) {
        const state = this.data.get("state")

        const playerNameText = new Phaser.GameObjects.Text(this, originX + 455, originY, player.name, {
            color: "#fff",
            stroke: "#000",
            strokeThickness: 4,
            fontSize: "14px"
        })
        this.root.add(playerNameText)
        const nameWidth = playerNameText.displayWidth

        const amberImage = new Phaser.GameObjects.Image(this, originX + 455 + nameWidth + 5, originY, "amber-token")
        amberImage.setDisplaySize(20, 20)
        amberImage.setOrigin(0)
        this.root.add(amberImage)

        const amberText = new Phaser.GameObjects.Text(this, originX + 455 + nameWidth + 15, originY + 11, player.amber, {
            color: "#fff",
            stroke: "#000",
            strokeThickness: 3,
            fontSize: "14px"
        })
        amberText.setOrigin(0.5)
        this.root.add(amberText)

        const chainsImage = new Phaser.GameObjects.Image(this, originX + 455 + nameWidth + 30, originY, "amber-token")
        chainsImage.setDisplaySize(20, 20)
        chainsImage.setOrigin(0)
        this.root.add(chainsImage)

        const chainsText = new Phaser.GameObjects.Text(this, originX + 455 + nameWidth + 40, originY + 11, player.chains, {
            color: "#fff",
            stroke: "#000",
            strokeThickness: 3,
            fontSize: "14px"
        })
        chainsText.setOrigin(0.5)
        this.root.add(chainsText)

        for (let i = 0; i < 3; i++) {
            const textureID = player.keys >= i + 1 ? "forged-key" : "unforged-key"
            const keySize = 30
            const keyImage = new Phaser.GameObjects.Image(this, originX + 655, originY + (keySize + 4) * i + 10, textureID)
            keyImage.setDisplaySize(keySize, keySize)
            keyImage.setOrigin(0)
            this.root.add(keyImage)
        }

        for (let i = 0; i < 7; i++) {
            const cardback = new Phaser.GameObjects.Image(this, originX + CARD_WIDTH / 2 + i * CARD_WIDTH * .75, originY + CARD_HEIGHT / 2, "cardback")
            cardback.setDisplaySize(CARD_WIDTH, CARD_HEIGHT)
            this.root.add(cardback)
        }

        const piles = ["Archon", "Draw", "Discard"]
        piles.forEach((pileTitle, i) => {
            const archivePileOutline = new Phaser.GameObjects.Rectangle(this, originX + CARD_WIDTH * 5.7 + i * (CARD_WIDTH * 0.7 + 10), originY + 25)
            archivePileOutline.setDisplaySize(CARD_WIDTH * 0.7, CARD_HEIGHT * 0.7)
            archivePileOutline.setStrokeStyle(1, 0)
            archivePileOutline.setOrigin(0)
            this.root.add(archivePileOutline)

            const archivePileText = new Phaser.GameObjects.Text(this, originX + CARD_WIDTH * 5.7 + 4 + i * (CARD_WIDTH * 0.7 + 10), originY + 29, pileTitle, {
                color: "#000",
                fontSize: "10px"
            })
            this.root.add(archivePileText)
        })

        const height = this.data.get("height")
        const creatureOffsetY = orientation === "top" ? height / 2 - 50 : -height / 2 + 250
        const artifactOffsetY = orientation === "top" ? 200 : -70

        for (let i = 0; i < player.artifacts.length; i++) {
            const artifact = player.artifacts[i]
            const card = new Card({
                scene: this,
                x: originX + 50 + 90 * artifact.position,
                y: originY + artifactOffsetY,
                id: `${player.name}-artifact-${artifact.position}`,
                front: artifact.id,
                back: "cardback",
                faceup: artifact.faceup,
                ready: artifact.ready,
                cardsUnderneath: artifact.cardsUnderneath,
                upgrades: artifact.upgrades,
                onClick: this.onClickCreature.bind(this),
                onMouseOver: this.onMouseOverCard.bind(this),
                onMouseOut: this.onMouseOutCard.bind(this),
            })
            Object.keys(artifact.tokens)
                .forEach(token => {
                    const tokenAmount = artifact.tokens[token]
                    card.addToken({
                        type: token,
                        amount: tokenAmount,
                    })
                })
            this.root.add(card)
        }


        for (let i = 0; i < player.creatures.length; i++) {
            const creature = player.creatures[i]
            const card = new Card({
                scene: this,
                x: originX + 50 + 90 * creature.position,
                y: originY + creatureOffsetY,
                id: `${player.name}-creature-${creature.position}`,
                front: creature.id,
                back: "cardback",
                faceup: creature.faceup,
                ready: creature.ready,
                cardsUnderneath: creature.cardsUnderneath,
                upgrades: creature.upgrades,
                onClick: this.onClickCreature.bind(this),
                onMouseOver: this.onMouseOverCard.bind(this),
                onMouseOut: this.onMouseOutCard.bind(this),
            })
            Object.keys(creature.tokens)
                .forEach(token => {
                    const tokenAmount = creature.tokens[token]
                    card.addToken({
                        type: token,
                        amount: tokenAmount,
                    })
                })
            this.root.add(card)
        }


    }

    render() {
        const state = this.data.get("state")
        this.root.removeAll()
        this.renderPlayerBoard(state.players[0], 5, 5, "top")
        this.renderPlayerBoard(state.players[1], 5, this.data.get("height") - CARD_HEIGHT - 5, "bottom")
    }

    onMouseOverCard(texture: string) {
        const width = 260
        const height = width / .716612378
        const image = new Phaser.GameObjects.Image(this, width / 2 + 20, height / 2 + 20, texture)
        image.setDisplaySize(width, height)
        this.root.add(image)
        this.cardHoverImage = image
    }

    onMouseOutCard(texture: string) {
        this.cardHoverImage.destroy()
    }

    onClickCreature(card: Card, e: any) {
        return // TODO
        const state = this.data.get("state")
        const creature = state.players[0].creatures.find((c: { position: number }) => "p0-creature-" + c.position === card.data.get("id"))

        if (e.event.which === 3 && e.event.shiftKey) {
            creature.tokens.damage -= 1
            this.render()
            return
        }

        if (e.event.which === 3) {
            creature.tokens.damage += 1
            this.render()
            return
        }

        if (!creature.ready) {
            return
        }

        if (creature.tokens.stun) {
            creature.tokens.stun = 0
            creature.ready = false
            this.render()
            return
        } else {
            state.players[0].amber += 1
            creature.ready = false
            this.render()
            return
        }
    }
}

export default GameScene
