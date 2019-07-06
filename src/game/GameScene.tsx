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
import chains from "../images/chains.png"
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
        this.load.image("chains", chains)
    }

    create() {
        this.root = this.add.container(0, 0)
        this.render()

        this.input.mouse.disableContextMenu()
        this.setupKeyboardListeners()
    }

    renderPlayerBoard(player: any, originX: number, originY: number, orientation: string) {
        const playerNameText = new Phaser.GameObjects.Text(this, originX + 750, originY, player.name, {
            color: "#fff",
            stroke: "#000",
            strokeThickness: 4,
            fontSize: "18px"
        })
        this.root.add(playerNameText)
        const nameWidth = playerNameText.displayWidth

        const amberImage = new Phaser.GameObjects.Image(this, originX + 750, originY + 30, "amber-token")
        amberImage.setDisplaySize(30, 30)
        amberImage.setOrigin(0)
        amberImage.setInteractive({ cursor: "pointer" })
        amberImage.addListener("pointerup", (e: any) => {
            dispatch({
                type: Event.AlterPlayerAmber,
                amount: e.event.shiftKey ? -1 : 1,
                playerName: player.name
            })
            this.render()
        })
        this.root.add(amberImage)

        const amberText = new Phaser.GameObjects.Text(this, originX + 750 + 15, originY + 45, player.amber, {
            color: "#fff",
            stroke: "#000",
            strokeThickness: 4,
            fontSize: "18px"
        })
        amberText.setOrigin(0.5)
        this.root.add(amberText)

        const chainsImage = new Phaser.GameObjects.Image(this, originX + 750, originY + 70, "chains")
        chainsImage.setDisplaySize(30, 30)
        chainsImage.setOrigin(0)
        chainsImage.setInteractive({ cursor: "pointer" })
        chainsImage.addListener("pointerup", (e: any) => {
            dispatch({
                type: Event.AlterPlayerChains,
                amount: e.event.shiftKey ? -1 : 1,
                playerName: player.name
            })
            this.render()
        })
        this.root.add(chainsImage)

        const chainsText = new Phaser.GameObjects.Text(this, originX + 750 + 15, originY + 85, player.chains, {
            color: "#fff",
            stroke: "#000",
            strokeThickness: 4,
            fontSize: "18px"
        })
        chainsText.setOrigin(0.5)
        this.root.add(chainsText)

        for (let i = 0; i < 3; i++) {
            const textureID = player.keys >= i + 1 ? "forged-key" : "unforged-key"
            const keySize = 30
            const keyImage = new Phaser.GameObjects.Image(this, originX + 710, originY + (keySize + 4) * i + 10, textureID)
            keyImage.setDisplaySize(keySize, keySize)
            keyImage.setOrigin(0)
            keyImage.setInteractive({ cursor: "pointer" })
            keyImage.addListener("pointerup", (e: any) => {
                dispatch({
                    type: e.event.shiftKey ? Event.UnForgeKey : Event.ForgeKey,
                    playerName: player.name
                })
                this.render()
            })
            this.root.add(keyImage)
        }

        const dispatch = this.data.get("dispatch")
        const height = this.data.get("height")
        const creatureOffsetY = orientation === "top" ? height / 2 - 50 : -height / 2 + 250
        const artifactOffsetY = orientation === "top" ? 200 : -70

        this.createCardDropZone(originX + CARD_WIDTH / 2, originY + creatureOffsetY, (card: Card) => {
            dispatch({
                type: Event.PlayCreature,
                cardID: card.data.get("id"),
                playerName: player.name,
                side: "left",
            })
            card.destroy()
            this.render()
        })

        const rightCreatureDropZoneX = originX + CARD_WIDTH / 2 + (CARD_WIDTH + CARD_WIDTH * 0.1) * (player.creatures.length + 1)
        this.createCardDropZone(rightCreatureDropZoneX, originY + creatureOffsetY, (card: Card) => {
            dispatch({
                type: Event.PlayCreature,
                cardID: card.data.get("id"),
                playerName: player.name,
                side: "right",
            })
            card.destroy()
            this.render()
        })

        const artifactDropZoneX = originX + CARD_WIDTH / 2
        this.createCardDropZone(artifactDropZoneX, originY + artifactOffsetY, (card: Card) => {
            dispatch({
                type: Event.PlayArtifact,
                cardID: card.data.get("id"),
                playerName: player.name,
            })
            card.destroy()
            this.render()
        })

        for (let i = 0; i < player.creatures.length; i++) {
            const dropZoneX = originX + CARD_WIDTH / 2 + (CARD_WIDTH + CARD_WIDTH * 0.1) * (i + 1)
            this.createCardDropZone(dropZoneX, originY + creatureOffsetY, (card: Card) => {
                dispatch({
                    type: Event.PlayUpgrade,
                    cardID: card.data.get("id"),
                })
                card.destroy()
                this.render()
            }, false)
        }

        const discardPileX = originX + CARD_WIDTH * 6
        this.createCardDropZone(discardPileX, originY + CARD_HEIGHT / 2, (card: Card) => {
            dispatch({
                type: Event.DiscardCard,
                cardID: card.data.get("id"),
            })
            card.destroy()
            this.render()
        })
        const discardPileText = new Phaser.GameObjects.Text(this, discardPileX - CARD_WIDTH * 0.5 + 5, originY + 5, `Discard (${player.discardPile.length})`, {
            color: "#000",
            fontSize: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.5)"
        })
        this.root.add(discardPileText)

        const archivePileX = originX + CARD_WIDTH * 6 + 2 * (CARD_WIDTH + CARD_WIDTH * 0.1)
        this.createCardDropZone(archivePileX, originY + CARD_HEIGHT / 2, (card: Card) => {
            dispatch({
                type: Event.ArchiveCard,
                cardID: card.data.get("id"),
            })
            card.destroy()
            this.render()
        })
        const archivePileText = new Phaser.GameObjects.Text(this, archivePileX - CARD_WIDTH * 0.5 + 5, originY + 5, `Archive (${player.archivePile.length})`, {
            color: "#000",
            fontSize: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.5)"
        })
        this.root.add(archivePileText)

        const drawPileX = originX + CARD_WIDTH * 6 + 1 * (CARD_WIDTH + CARD_WIDTH * 0.1)
        const drawPileImage = new Phaser.GameObjects.Image(this, drawPileX, originY + CARD_HEIGHT / 2, "cardback")
        drawPileImage.setDisplaySize(CARD_WIDTH, CARD_HEIGHT)
        drawPileImage.setInteractive({ cursor: "pointer" })
        drawPileImage.addListener("pointerup", (e: any) => {
            dispatch({
                type: e.event.shiftKey ? Event.ShuffleDeck : Event.DrawCard,
                playerName: player.name,
            })
            this.render()
        })
        this.root.add(drawPileImage)
        const drawPileText = new Phaser.GameObjects.Text(this, drawPileX - CARD_WIDTH * 0.5 + 5, originY + 5, `Draw (${player.drawPile.length})`, {
            color: "#000",
            fontSize: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.5)"
        })
        this.root.add(drawPileText)

        for (let i = 0; i < player.artifacts.length; i++) {
            const artifact = player.artifacts[i]
            const card = new Card({
                scene: this,
                x: originX + CARD_WIDTH / 2 + (CARD_WIDTH + CARD_WIDTH * 0.1) * (i + 1),
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
            let creatureY = originY + creatureOffsetY
            if (creature.taunt) {
                creatureY += orientation === "top" ? 15 : -15
            }
            const card = new Card({
                scene: this,
                x: originX + CARD_WIDTH / 2 + (CARD_WIDTH + CARD_WIDTH * 0.1) * (i + 1),
                y: creatureY,
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

        const handWidth = CARD_WIDTH * 4
        for (let i = 0; i < player.hand.length; i++) {
            const card = new Card({
                scene: this,
                x: originX + CARD_WIDTH / 2 + i * Math.min((handWidth / player.hand.length), CARD_WIDTH * 0.8),
                y: originY + CARD_HEIGHT / 2,
                id: `${player.name}-card-in-hand-${i}`,
                front: orientation === "top" ? "cardback" : player.hand[i].id,
                back: "cardback",
                faceup: orientation === "bottom",
                draggable: true,
                onClick: this.onClickCardInHand.bind(this),
                onMouseOver: this.onMouseOverCardInHand.bind(this),
                onMouseOut: this.onMouseOutCardInHand.bind(this),
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

    createCardDropZone(x: number, y: number, onDrop: Function, visible=true) {
        const zone = new Phaser.GameObjects.Zone(this, x, y, CARD_WIDTH, CARD_HEIGHT)
        const image = new Phaser.GameObjects.Image(this, zone.x, zone.y, "cardback")

        zone.setRectangleDropZone(CARD_WIDTH, CARD_HEIGHT)
        zone.setDataEnabled()
        // @ts-ignore
        zone.data.set({
            onEnter: () => {
                image.setAlpha(1)
            },
            onLeave: () => {
                image.setAlpha(0.1)
            },
            onDrop,
        })

        zone.data.get("onLeave")()
        image.setDisplaySize(CARD_WIDTH, CARD_HEIGHT)
        this.root.add(zone)
        if (visible)
            this.root.add(image)
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

            if (this.creatureMousingOver instanceof Card && e.which === KeyCodes.T) {
                dispatch({
                    type: Event.ToggleTaunt,
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
