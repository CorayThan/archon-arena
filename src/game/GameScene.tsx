import Phaser from "phaser"

import amber from "../images/amber.png"
import armor from "../images/armor.png"
import cardback from "../images/cardback.jpg"
import chains from "../images/chains.png"
import damage from "../images/damage.png"
import forgedKey from "../images/forgedkey.png"
import power from "../images/power.png"
import stun from "../images/stun.png"
import unforgedKey from "../images/unforgedkey.png"

import Card, { CARD_HEIGHT, CARD_WIDTH } from "./Card"
import { Event } from "./Event"
import { getCardType } from "./StateUtils"
import { preloadCardsInPhaser } from "./Utils"
import { Creature } from "../shared/gamestate/Creature"
import { Artifact } from "../shared/gamestate/Artifact"
import { CardNotInPlay } from "../shared/gamestate/CardNotInPlay"

const { KeyCodes } = Phaser.Input.Keyboard

export const gameSceneHolder: {gameScene?: GameScene} = {
    gameScene: undefined
}

class GameScene extends Phaser.Scene {
    // @ts-ignore
    root: Phaser.GameObjects.Container
    cardHoverImage: Phaser.GameObjects.Image | undefined
    creatureMousingOver: Phaser.GameObjects.GameObject | undefined
    artifactMousingOver: Phaser.GameObjects.GameObject | undefined
    cardInHandMousingOver: Phaser.GameObjects.GameObject | undefined
    modalContainer: Phaser.GameObjects.Container | undefined
    keysDown: {
        [key: string]: boolean
    }

    constructor() {
        super("GameScene")
        this.keysDown = {}
        gameSceneHolder.gameScene = this
    }

    preload() {
        this.load.image("cardback", cardback)
        this.load.image("unforged-key", unforgedKey)
        this.load.image("forged-key", forgedKey)
        this.load.image("damage-token", damage)
        this.load.image("amber-token", amber)
        this.load.image("stun-token", stun)
        this.load.image("armor-token", armor)
        this.load.image("power-token", power)
        this.load.image("chains", chains)
        this.load.image("doom-token", chains)

        // @ts-ignore
        const state = this.scene.settings.data.state
        const players = [state.playerOneState, state.playerTwoState]
        for (let i = 0; i < players.length; i++) {
            const player = players[i]
            preloadCardsInPhaser(this, player.hand)
            preloadCardsInPhaser(this, player.library)
            preloadCardsInPhaser(this, player.discard)
            preloadCardsInPhaser(this, player.archives)
            preloadCardsInPhaser(this, player.purged)
            preloadCardsInPhaser(this, player.artifacts)
            preloadCardsInPhaser(this, player.creatures)
            player.creatures.forEach((creature: Creature) => {
                preloadCardsInPhaser(this, creature.upgrades)
            })
        }
    }

    create() {
        this.root = this.add.container(0, 0)
        this.render()
        // this.setupKeyboardListeners()
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

        const amberImage = new Phaser.GameObjects.Image(this, originX + 750, originY + 25, "amber-token")
        amberImage.setDisplaySize(40, 40)
        amberImage.setOrigin(0)
        amberImage.setInteractive({ cursor: "pointer" })
        amberImage.addListener("pointerup", (pointer: Phaser.Input.Pointer) => {
            dispatch({
                type: Event.AlterPlayerAmber,
                amount: pointer.button === 2 ? -1 : 1,
                playerName: player.name
            })
            this.render()
        })
        this.root.add(amberImage)

        const amberText = new Phaser.GameObjects.Text(this, originX + 750 + 20, originY + 45, player.amber, {
            color: "#fff",
            stroke: "#000",
            strokeThickness: 4,
            fontSize: "24px"
        })
        amberText.setOrigin(0.5)
        this.root.add(amberText)

        const chainsImage = new Phaser.GameObjects.Image(this, originX + 750, originY + 70, "chains")
        chainsImage.setDisplaySize(30, 30)
        chainsImage.setOrigin(0)
        chainsImage.setInteractive({ cursor: "pointer" })
        chainsImage.addListener("pointerup", (pointer: Phaser.Input.Pointer) => {
            dispatch({
                type: Event.AlterPlayerChains,
                amount: pointer.button === 2 ? -1 : 1,
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
            const textureId = player.keys >= i + 1 ? "forged-key" : "unforged-key"
            const keySize = 30
            const keyImage = new Phaser.GameObjects.Image(this, originX + 710, originY + (keySize + 4) * i + 10, textureId)
            keyImage.setDisplaySize(keySize, keySize)
            keyImage.setOrigin(0)
            keyImage.setInteractive({ cursor: "pointer" })
            keyImage.addListener("pointerup", (pointer: Phaser.Input.Pointer) => {
                dispatch({
                    type: pointer.event.shiftKey ? Event.UnForgeKey : Event.ForgeKey,
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

        const artifactDropZoneX = originX + CARD_WIDTH / 2
        this.createCardDropZone({
            x: artifactDropZoneX,
            y: originY + artifactOffsetY,
            onDrop: (card: Card) => {
                const cardId = card.data.get("id")
                if (getCardType(cardId) !== "card-in-hand")
                    return

                dispatch({
                    type: Event.PlayArtifact,
                    playerName: player.name,
                    cardId,
                })
                card.destroy()
                this.render()
            }
        })

        const discardPileX = originX + CARD_WIDTH * 6
        const discardPileZone = this.createCardDropZone({
            x: discardPileX,
            y: originY + CARD_HEIGHT / 2,
            allowCardTypes: ["card-in-hand", "creature", "artifact", "upgrade"],
            getCardImage: () => player.discard.length === 0 ? "cardback" : player.discard[player.discard.length - 1].id,
            getMinimumAlpha: () => player.discard.length === 0 ? 0.1 : 1,
            onDrop: (card: Card) => {
                dispatch({
                    type: Event.DiscardCard,
                    cardId: card.data.get("id"),
                })
                card.destroy()
                this.render()
            }
        })
        discardPileZone.addListener("pointerup", (pointer: Phaser.Input.Pointer) => {
            if (pointer.button === 2) {
                this.openCardModal({
                    x: discardPileZone.x,
                    y: discardPileZone.y,
                    cards: player.discard,
                    orientation,
                    onClick: (card: CardNotInPlay, i: number) => {
                        dispatch({
                            type: Event.MoveCardFromDiscardToHand,
                            cardId: `${player.name}-card-in-discard-${i}`,
                        })
                        this.render()
                    }
                })
            } else {
                if (pointer.event.shiftKey) {
                    dispatch({
                        type: Event.ShuffleDiscardIntoDeck,
                        playerName: player.name,
                    })
                } else {
                    dispatch({
                        type: Event.DrawFromDiscard,
                        playerName: player.name,
                    })
                }
                this.render()
            }
        })
        const discardPileText = new Phaser.GameObjects.Text(this, discardPileX - CARD_WIDTH * 0.5 + 5, originY + 5, `Discard (${player.discard.length})`, {
            color: "#000",
            backgroundColor: "rgba(255, 255, 255, 1)",
            fontSize: "10px",
        })
        this.root.add(discardPileText)

        const drawPileX = originX + CARD_WIDTH * 6 + 1 * (CARD_WIDTH + CARD_WIDTH * 0.1)
        const drawPileZone = this.createCardDropZone({
            x: drawPileX,
            y: originY + CARD_HEIGHT / 2,
            getMinimumAlpha: () => player.library.length === 0 ? 0.1 : 1,
            allowCardTypes: ["card-in-hand", "creature", "artifact", "upgrade"],
            onDrop: (card: Card) => {
                dispatch({
                    type: Event.PutCardOnDrawPile,
                    cardId: card.data.get("id"),
                })
                card.destroy()
                this.render()
            },
        })
        drawPileZone.addListener("pointerup", (pointer: Phaser.Input.Pointer) => {
            if (pointer.button === 2) {
                this.openCardModal({
                    x: drawPileZone.x,
                    y: drawPileZone.y,
                    cards: player.library.reverse(),
                    orientation,
                    onClick: (card: CardNotInPlay, i: number) => {
                        dispatch({
                            type: Event.MoveCardFromDrawPileToHand,
                            cardId: `${player.name}-card-in-draw-${i}`,
                        })
                        this.render()
                    }
                })
            } else {
                dispatch({
                    type: pointer.event.shiftKey ? Event.ShuffleDeck : Event.DrawCard,
                    playerName: player.name,
                })
                this.render()
            }
        })
        const drawPileText = new Phaser.GameObjects.Text(this, drawPileX - CARD_WIDTH * 0.5 + 5, originY + 5, `Draw (${player.library.length})`, {
            color: "#000",
            fontSize: "10px",
            backgroundColor: "rgba(255, 255, 255, 1)"
        })
        this.root.add(drawPileText)

        const archivePileX = originX + CARD_WIDTH * 6 + 2 * (CARD_WIDTH + CARD_WIDTH * 0.1)
        const archivePileZone = this.createCardDropZone({
            x: archivePileX,
            y: originY + CARD_HEIGHT / 2,
            getMinimumAlpha: () => player.archives.length === 0 ? 0.1 : 1,
            allowCardTypes: ["card-in-hand", "creature", "artifact"],
            onDrop: (card: Card) => {
                dispatch({
                    type: Event.ArchiveCard,
                    cardId: card.data.get("id"),
                })
                card.destroy()
                this.render()
            },
        })
        archivePileZone.addListener("pointerup", (pointer: Phaser.Input.Pointer) => {
            if (pointer.button === 2) {
                this.openCardModal({
                    x: archivePileZone.x,
                    y: archivePileZone.y,
                    cards: player.archives,
                    orientation,
                    onClick: (card: CardNotInPlay, i: number) => {
                        dispatch({
                            type: Event.MoveCardFromArchiveToHand,
                            cardId: `${player.name}-card-in-archive-${i}`,
                        })
                        this.render()
                    }
                })
            } else {
                dispatch({
                    type: Event.TakeArchive
                })
                this.render()
            }
        })
        const archivePileText = new Phaser.GameObjects.Text(this, archivePileX - CARD_WIDTH * 0.5 + 5, originY + 5, `Archive (${player.archives.length})`, {
            color: "#000",
            fontSize: "10px",
            backgroundColor: "rgba(255, 255, 255, 1)"
        })
        this.root.add(archivePileText)

        const purgePileX = originX + 760 + nameWidth + CARD_WIDTH / 2
        const purgePileZone = this.createCardDropZone({
            x: purgePileX,
            y: originY + CARD_HEIGHT / 2,
            getCardImage: () => player.purged.length === 0 ? "cardback" : player.purged[player.purged.length - 1].id,
            getMinimumAlpha: () => player.purged.length === 0 ? 0.1 : 1,
            allowCardTypes: ["card-in-hand", "creature", "artifact", "upgrade"],
            onDrop: (card: Card) => {
                dispatch({
                    type: Event.PurgeCard,
                    cardId: card.data.get("id"),
                })
                card.destroy()
                this.render()
            },
        })
        purgePileZone.addListener("pointerup", () => {
            // Open purge modal
        })
        const purgePileText = new Phaser.GameObjects.Text(this, purgePileX - CARD_WIDTH * 0.5 + 5, originY + 5, `Purge (${player.purged.length})`, {
            color: "#000",
            fontSize: "10px",
            backgroundColor: "rgba(255, 255, 255, 1)"
        })
        this.root.add(purgePileText)

        let artifactOffsetX = 0
        for (let i = 0; i < player.artifacts.length; i++) {
            const artifact = player.artifacts[i]

            if (i > 0) {
                const previousArtifact = player.artifacts[i - 1]
                if (!player.artifacts[i - 1].ready) {
                    artifactOffsetX += CARD_WIDTH * 0.2
                } else {
                    artifactOffsetX += (CARD_WIDTH * 0.1) * previousArtifact.cardsUnderneath.length
                }
            }

            if (!artifact.ready) {
                artifactOffsetX += CARD_WIDTH * 0.2
                artifactOffsetX += (CARD_WIDTH * 0.1) * (artifact.cardsUnderneath.length)
            }

            const card = new Card({
                scene: this,
                x: originX + CARD_WIDTH / 2 + (CARD_WIDTH + CARD_WIDTH * 0.1) * (i + 1) + artifactOffsetX,
                y: originY + artifactOffsetY,
                id: `${player.name}-artifact-${i}`,
                front: artifact.id,
                back: "cardback",
                faceup: artifact.faceup,
                ready: artifact.ready,
                cardsUnderneath: artifact.cardsUnderneath,
                draggable: true,
                onClick: this.onClickArtifact.bind(this),
                onMouseOver: this.onMouseOverArtifact.bind(this),
                onMouseOut: this.onMouseOutArtifact.bind(this),
                onDragStart: this.onDragStart.bind(this),
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

        let lastCreatureX = 0
        let creatureOffsetX = 0
        for (let i = 0; i < player.creatures.length; i++) {
            const creature = player.creatures[i]
            let creatureY = originY + creatureOffsetY
            if (creature.taunt) {
                creatureY += orientation === "top" ? 15 : -15
            }

            if (i > 0) {
                const previousCreature = player.creatures[i - 1]
                if (!player.creatures[i - 1].ready) {
                    creatureOffsetX += CARD_WIDTH * 0.2
                    creatureOffsetX += (CARD_WIDTH * 0.2) * previousCreature.upgrades.length
                } else {
                    creatureOffsetX += (CARD_WIDTH * 0.1) * previousCreature.cardsUnderneath.length
                }
            }

            if (!creature.ready) {
                creatureOffsetX += CARD_WIDTH * 0.2
                creatureOffsetX += (CARD_WIDTH * 0.1) * (creature.cardsUnderneath.length)
            }

            const creatureCard = new Card({
                scene: this,
                x: originX + CARD_WIDTH / 2 + (CARD_WIDTH + CARD_WIDTH * 0.1) * (i + 1) + creatureOffsetX,
                y: creatureY,
                id: `${player.name}-creature-${i}`,
                front: creature.id,
                back: "cardback",
                faceup: creature.faceup,
                ready: creature.ready,
                cardsUnderneath: creature.cardsUnderneath,
                upgrades: creature.upgrades,
                draggable: true,
                onClick: this.onClickCreature.bind(this),
                onMouseOver: this.onMouseOverCreature.bind(this),
                onMouseOut: this.onMouseOutCreature.bind(this),
                onMouseOverUpgrade: this.onMouseOverUpgrade.bind(this),
                onMouseOutUpgrade: this.onMouseOutUpgrade.bind(this),
                onDragStart: this.onDragStart.bind(this),
            })
            Object.keys(creature.tokens)
                .forEach(token => {
                    const tokenAmount = creature.tokens[token]
                    creatureCard.addToken({
                        type: token,
                        amount: tokenAmount,
                    })
                })
            lastCreatureX = creatureCard.x
            this.root.add(creatureCard)

            const dropZoneX = creatureCard.x
            this.createCardDropZone({
                x: dropZoneX,
                y: originY + creatureOffsetY,
                visible: false,
                onDrop: (droppedCard: Card) => {
                    const droppedCardId = droppedCard.data.get("id")
                    if (getCardType(droppedCardId) !== "card-in-hand")
                        return

                    dispatch({
                        type: Event.PlayUpgrade,
                        upgradeId: droppedCard.data.get("id"),
                        creatureId: creatureCard.data.get("id"),
                    })
                    droppedCard.destroy()
                    this.render()
                }
            })
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
                onDragStart: this.onDragStart.bind(this),
                onDragEnd: this.onDragEndCardInHand.bind(this),
            })
            this.root.add(card)
        }

        this.createCardDropZone({
            x: originX + CARD_WIDTH / 2,
            y: originY + creatureOffsetY,
            onDrop: (card: Card) => {
                const cardId = card.data.get("id")
                if (getCardType(cardId) !== "card-in-hand")
                    return

                dispatch({
                    type: Event.PlayCreature,
                    cardId: card.data.get("id"),
                    playerName: player.name,
                    side: "left",
                })
                card.destroy()
                this.render()
            }
        })

        if (player.creatures.length) {
            let rightCreatureDropZoneX = lastCreatureX + (CARD_WIDTH + CARD_WIDTH * 0.2)
            const lastCreature = player.creatures[player.creatures.length - 1]
            if (!lastCreature.ready) {
                rightCreatureDropZoneX += CARD_WIDTH * 0.1
            }
            this.createCardDropZone({
                x: rightCreatureDropZoneX,
                y: originY + creatureOffsetY,
                onDrop: (card: Card) => {
                    const cardId = card.data.get("id")
                    if (getCardType(cardId) !== "card-in-hand")
                        return

                    dispatch({
                        type: Event.PlayCreature,
                        cardId: card.data.get("id"),
                        playerName: player.name,
                        side: "right",
                    })
                    card.destroy()
                    this.render()
                }
            })
        }
    }

    render() {
        const state = this.data.get("state")
        this.root.destroy()
        this.root = this.add.container(0, 0)

        // TODO self on bottom
        this.renderPlayerBoard(state.playerOneState, 5, 5, "top")
        this.renderPlayerBoard(state.playerTwoState, 5, this.data.get("height") - CARD_HEIGHT - 5, "bottom")

        if (this.modalContainer) {
            this.modalContainer.destroy()
            delete this.modalContainer
        }
    }

    createCardDropZone({
        x,
        y,
        onDrop,
        getCardImage = () => "cardback",
        getMinimumAlpha = () => 0.1,
        visible=true,
        allowCardTypes=["card-in-hand"]
    }: {
        x: number,
        y: number,
        onDrop: Function,
        getCardImage?: Function,
        getMinimumAlpha?: Function,
        visible?: boolean,
        allowCardTypes?: string[],
    }) {
        const zone = new Phaser.GameObjects.Zone(this, x, y, CARD_WIDTH, CARD_HEIGHT)
        const image = new Phaser.GameObjects.Image(this, zone.x, zone.y, getCardImage())

        zone.setRectangleDropZone(CARD_WIDTH, CARD_HEIGHT)
        zone.setDataEnabled()
        // @ts-ignore
        zone.data.set({
            onEnter: (card: Card) => {
                const cardId = card.data.get("id")
                const cardType = getCardType(cardId)
                if (allowCardTypes.includes(cardType)) {
                    image.setAlpha(1)
                }
            },
            onLeave: () => {
                image.setAlpha(getMinimumAlpha())
            },
            onDrop,
        })

        zone.data.get("onLeave")()
        image.setDisplaySize(CARD_WIDTH, CARD_HEIGHT)
        this.root.add(zone)
        if (visible) {
          this.root.add(image)
          this.root.sendToBack(image)
        }
        this.root.sendToBack(zone)
        return zone
    }

    openCardModal({
        x,
        y,
        cards,
        orientation,
        onClick,
    }: {
        x: number,
        y: number,
        cards: CardNotInPlay[],
        orientation: string,
        onClick: Function,
    }) {
        if (this.modalContainer) {
            this.modalContainer.destroy()
            delete this.modalContainer
        } else {
            this.modalContainer = new Phaser.GameObjects.Container(this, 0, 0)
            for (let i = cards.length - 1; i >= 0; i--) {
                const card = cards[i]
                let cardOffsetY = (CARD_HEIGHT * 0.25) * i + CARD_HEIGHT + 10
                if (orientation === "bottom")
                    cardOffsetY = cardOffsetY * -1
                const image = new Phaser.GameObjects.Image(this, x, y + cardOffsetY, card.id)
                image.setDisplaySize(CARD_WIDTH, CARD_HEIGHT)
                image.setInteractive()
                image.addListener("pointerup", () => { onClick(card, i) })
                image.addListener("pointerover", () => {
                    this.showEnlargedCard(card.id)
                })
                image.addListener("pointerout", () => {
                    if (this.cardHoverImage)
                        this.cardHoverImage.destroy()
                })
                this.modalContainer.add(image)
            }
            this.root.add(this.modalContainer)
        }
    }

    onMouseOverCreature(e: MouseEvent, target: any) {
        const texture = target.data.get("front")
        this.showEnlargedCard(texture)
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
        const cardId = card.data.get("id")

        if (this.keysDown[KeyCodes.R]) {
            dispatch({
                type: Event.MoveCreatureRight,
                cardId,
            })
            card.destroy()
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.L]) {
            dispatch({
                type: Event.MoveCreatureLeft,
                cardId,
            })
            card.destroy()
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.B]) {
            dispatch({
                type: Event.DiscardCard,
                cardId,
            })
            card.destroy()
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.M]) {
            dispatch({
                type: Event.MoveCreatureToHand,
                cardId,
            })
            card.destroy()
            this.render()
            return
        }

        dispatch({
            type: Event.UseCreature,
            cardId,
        })
        this.render()
    }

    onMouseOverArtifact(e: MouseEvent, target: any) {
        const texture = target.data.get("front")
        this.showEnlargedCard(texture)
        this.artifactMousingOver = target
    }

    onMouseOutArtifact() {
        this.artifactMousingOver = undefined

        if (this.cardHoverImage)
            this.cardHoverImage.destroy()
    }

    onClickArtifact(e: MouseEvent, card: Card) {
        const state = this.data.get("state")
        const dispatch = this.data.get("dispatch")
        const cardId = card.data.get("id")

        if (this.keysDown[KeyCodes.B]) {
            dispatch({
                type: Event.DiscardCard,
                cardId,
            })
            card.destroy()
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.M]) {
            dispatch({
                type: Event.MoveArtifactToHand,
                cardId,
            })
            card.destroy()
            this.render()
            return
        }

        dispatch({
            type: Event.UseArtifact,
            cardId,
        })
        this.render()
    }

    onClickCardInHand(e: MouseEvent, card: Card) {
        const dispatch = this.data.get("dispatch")
        const cardId = card.data.get("id")

        if (this.keysDown[KeyCodes.D]) {
            dispatch({
                type: Event.DiscardCard,
                cardId,
            })
            card.destroy()
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.A]) {
            dispatch({
                type: Event.PlayArtifact,
                cardId,
            })
            card.destroy()
            this.render()
            return
        }

        card.destroy()
        this.render()
    }

    onMouseOverCardInHand(e: MouseEvent, target: any) {
        const texture = target.data.get("front")
        this.showEnlargedCard(texture)
        this.cardInHandMousingOver = target
    }

    onMouseOutCardInHand() {
        this.cardInHandMousingOver = undefined

        if (this.cardHoverImage)
            this.cardHoverImage.destroy()
    }

    onDragEndCardInHand(card: Card) {
        const distY = card.data.get("y") - card.y
        if (distY > CARD_HEIGHT) {
            const dispatch = this.data.get("dispatch")
            const cardId = card.data.get("id")
            dispatch({
                type: Event.PlayAction,
                cardId,
            })
            card.destroy()
            this.render()
        } else {
            card.render()
        }
    }

    onMouseOverUpgrade(e: MouseEvent, target: any) {
        const texture = target.data.get("front")
        this.showEnlargedCard(texture)
        this.creatureMousingOver = target
    }

    onMouseOutUpgrade() {
        this.creatureMousingOver = undefined

        if (this.cardHoverImage)
            this.cardHoverImage.destroy()
    }

    onDragStart() {
        this.creatureMousingOver = undefined
        this.artifactMousingOver  = undefined
        this.cardInHandMousingOver = undefined

        if (this.cardHoverImage)
            this.cardHoverImage.destroy()
    }

    showEnlargedCard(texture: string) {
        if (texture === "cardback")
            return
        const width = 220
        const height = width / .716612378
        const image = new Phaser.GameObjects.Image(this, this.data.get("width") - width / 2 - 10, height / 2 + 10, texture)
        image.setDisplaySize(width, height)
        this.root.add(image)
        this.cardHoverImage = image
    }

    setupKeyboardListeners() {
        const dispatch = this.data.get("dispatch")

        this.input.keyboard.on("keydown", (e: MouseEvent) => {
            this.keysDown[e.which] = true
        })

        this.input.keyboard.on("keyup", (e: MouseEvent) => {
            this.keysDown[e.which] = false

            let cardId
            if (this.creatureMousingOver)
                cardId = this.creatureMousingOver.data.get("id")
            if (this.artifactMousingOver)
                cardId = this.artifactMousingOver.data.get("id")

            if (this.creatureMousingOver instanceof Card && e.which === KeyCodes.C) {
                dispatch({
                    type: Event.CaptureAmber,
                    cardId,
                    amount: e.shiftKey ? -1 : 1
                })
                this.render()
            }

            if (this.creatureMousingOver instanceof Card && e.which === KeyCodes.S) {
                dispatch({
                    type: Event.ToggleStun,
                    cardId,
                })
                this.render()
            }

            if (this.creatureMousingOver instanceof Card && e.which === KeyCodes.T) {
                dispatch({
                    type: Event.ToggleTaunt,
                    cardId,
                })
                this.render()
            }

            if (this.creatureMousingOver instanceof Card && e.which === KeyCodes.P) {
                dispatch({
                    type: Event.AlterCreaturePower,
                    cardId,
                    amount: e.shiftKey ? -1 : 1
                })
                this.render()
            }

            if (this.creatureMousingOver instanceof Card && e.which === KeyCodes.D) {
                dispatch({
                    type: Event.AlterCreatureDamage,
                    cardId,
                    amount: e.shiftKey ? -1 : 1
                })
                this.render()
            }

            if ((this.creatureMousingOver instanceof Card || this.artifactMousingOver instanceof Card) && e.which === KeyCodes.X) {
                dispatch({
                    type: Event.ToggleDoomToken,
                    cardId,
                })
                this.render()
            }

            if ((this.creatureMousingOver instanceof Card || this.artifactMousingOver instanceof Card) && e.which === KeyCodes.A) {
                dispatch({
                    type: Event.AddAmberToCard,
                    cardId,
                    amount: e.shiftKey ? -1 : 1
                })
                this.render()
            }
        })
    }
}

export default GameScene
