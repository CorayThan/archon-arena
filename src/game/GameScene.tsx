import Phaser from "phaser"
import Card, { CARD_WIDTH, CARD_HEIGHT } from "./Card"
import { Event } from "./Event"
import { log } from "../Utils"

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

const { KeyCodes } = Phaser.Input.Keyboard

class GameScene extends Phaser.Scene {
    // @ts-ignore
    root: Phaser.GameObjects.Container
    // @ts-ignore
    cardHoverImage: Phaser.GameObjects.Image | undefined
    // @ts-ignore
    creatureMousingOver: Phaser.GameObjects.GameObject | undefined
    keysDown: {
        [key: string]: boolean
    }

    constructor() {
        super("GameScene")
        this.keysDown = {}
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
        this.setupKeyboardListeners()
    }

    renderPlayerBoard(player: any, originX: number, originY: number, orientation: string) {
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

        for (let i = 0; i < player.hand.length; i++) {
            const card = new Card({
                scene: this,
                x: originX + CARD_WIDTH / 2 + i * CARD_WIDTH * .75,
                y: originY + CARD_HEIGHT / 2,
                id: `${player.name}-card-in-hand-${i}`,
                front: orientation === "top" ? "cardback" : player.hand[i].id,
                back: "cardback",
                faceup: orientation === "bottom",
                onClick: this.onClickCardInHand.bind(this),
                onMouseOver: this.onMouseOverCardInHand.bind(this),
                onMouseOut: this.onMouseOutCardInHand.bind(this),
            })
            this.root.add(card)
        }

        const piles = ["Discard", "Draw", "Archon"]
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
                x: originX + 50 + 90 * i,
                y: originY + artifactOffsetY,
                id: `${player.name}-artifact-${i}`,
                front: artifact.id,
                back: "cardback",
                faceup: artifact.faceup,
                ready: artifact.ready,
                cardsUnderneath: artifact.cardsUnderneath,
                upgrades: artifact.upgrades,
                onClick: this.onClickArtifact.bind(this),
                onMouseOver: this.onMouseOverArtifact.bind(this),
                onMouseOut: this.onMouseOutArtifact.bind(this),
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
                x: originX + 50 + 90 * i,
                y: originY + creatureOffsetY,
                id: `${player.name}-creature-${i}`,
                front: creature.id,
                back: "cardback",
                faceup: creature.faceup,
                ready: creature.ready,
                cardsUnderneath: creature.cardsUnderneath,
                upgrades: creature.upgrades,
                onClick: this.onClickCreature.bind(this),
                onMouseOver: this.onMouseOverCreature.bind(this),
                onMouseOut: this.onMouseOutCreature.bind(this),
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
        this.root.destroy()
        this.root = this.add.container(0, 0)
        this.renderPlayerBoard(state.players[0], 5, 5, "top")
        this.renderPlayerBoard(state.players[1], 5, this.data.get("height") - CARD_HEIGHT - 5, "bottom")
    }

    onMouseOverCreature(e: MouseEvent, target: any) {
        const width = 220
        const height = width / .716612378
        const texture = target.data.get("front")
        const image = new Phaser.GameObjects.Image(this, this.data.get("width") - width / 2 - 10, height / 2 + 10, texture)
        image.setDisplaySize(width, height)
        this.root.add(image)
        this.cardHoverImage = image
        this.creatureMousingOver = target
    }

    onMouseOutCreature() {
        this.creatureMousingOver = undefined

        if (this.cardHoverImage)
            this.cardHoverImage.destroy()
    }

    onClickCreature(e: MouseEvent, card: Card) {
        const state = this.data.get("state")
        const dispatch = this.data.get("dispatch")
        const cardID = card.data.get("id")

        if (this.keysDown[KeyCodes.B]) {
            dispatch({
                type: Event.DiscardCreature,
                cardID,
            })
            card.destroy()
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.M]) {
            dispatch({
                type: Event.MoveCreatureToHand,
                cardID,
            })
            card.destroy()
            this.render()
            return
        }

        dispatch({
            type: Event.UseCreature,
            cardID,
        })
        this.render()
    }

    onMouseOverArtifact(e: MouseEvent, target: any) {
        const width = 220
        const height = width / .716612378
        const texture = target.data.get("front")
        const image = new Phaser.GameObjects.Image(this, this.data.get("width") - width / 2 - 10, height / 2 + 10, texture)
        image.setDisplaySize(width, height)
        this.root.add(image)
        this.cardHoverImage = image
    }

    onMouseOutArtifact() {
        this.creatureMousingOver = undefined

        if (this.cardHoverImage)
            this.cardHoverImage.destroy()
    }

    onClickArtifact(e: MouseEvent, card: Card) {
        const state = this.data.get("state")
        const dispatch = this.data.get("dispatch")
        const cardID = card.data.get("id")

        if (this.keysDown[KeyCodes.B]) {
            dispatch({
                type: Event.DiscardArtifact,
                cardID,
            })
            card.destroy()
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.M]) {
            dispatch({
                type: Event.MoveArtifactToHand,
                cardID,
            })
            card.destroy()
            this.render()
            return
        }

        dispatch({
            type: Event.UseArtifact,
            cardID,
        })
        this.render()
    }

    onClickCardInHand(e: MouseEvent, card: Card) {
        const dispatch = this.data.get("dispatch")
        const cardID = card.data.get("id")

        if (this.keysDown[KeyCodes.D]) {
            dispatch({
                type: Event.DiscardCard,
                cardID,
            })
            card.destroy()
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.A]) {
            dispatch({
                type: Event.PlayArtifact,
                cardID,
            })
            card.destroy()
            this.render()
            return
        }

        dispatch({
            type: Event.PlayCreature,
            cardID,
            side: e.which === 3 ? "right" : "left"
        })
        card.destroy()
        this.render()
    }

    onMouseOverCardInHand(e: MouseEvent, target: any) {
        const width = 220
        const height = width / .716612378
        const texture = target.data.get("front")
        const image = new Phaser.GameObjects.Image(this, this.data.get("width") - width / 2 - 10, height / 2 + 10, texture)
        image.setDisplaySize(width, height)
        this.root.add(image)
        this.cardHoverImage = image
    }

    onMouseOutCardInHand() {
        this.creatureMousingOver = undefined

        if (this.cardHoverImage)
            this.cardHoverImage.destroy()
    }

    setupKeyboardListeners() {
        const dispatch = this.data.get("dispatch")

        const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        spaceBar.on("up", () => {
            dispatch({ type: Event.EndTurn, })
            this.render()
        })

        this.input.keyboard.on("keydown", (e: any) => {
            this.keysDown[e.which] = true
        })

        this.input.keyboard.on("keyup", (e: any) => {
            this.keysDown[e.which] = false

            let cardID
            if (this.creatureMousingOver)
                cardID = this.creatureMousingOver.data.get("id")

            if (this.creatureMousingOver instanceof Card && e.which === KeyCodes.C) {
                dispatch({
                    type: Event.CaptureAmber,
                    cardID,
                    amount: e.shiftKey ? -1 : 1
                })
                this.render()
            }

            if (this.creatureMousingOver instanceof Card && e.which === KeyCodes.S) {
                dispatch({
                    type: Event.ToggleStun,
                    cardID,
                })
                this.render()
            }

            if (this.creatureMousingOver instanceof Card && e.which === KeyCodes.P) {
                dispatch({
                    type: Event.AlterCreaturePower,
                    cardID,
                    amount: e.shiftKey ? -1 : 1
                })
                this.render()
            }

            if (this.creatureMousingOver instanceof Card && e.which === KeyCodes.D) {
                dispatch({
                    type: Event.AlterCreatureDamage,
                    cardID,
                    amount: e.shiftKey ? -1 : 1
                })
                this.render()
            }
        })
    }
}

export default GameScene
