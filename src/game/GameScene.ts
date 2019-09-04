import Phaser from "phaser"
import amber from "../images/amber.png"
import cardPower from "../images/card-power.png"
import enhancedCardPower from "../images/enhanced-card-power.png"
import armor from "../images/armor.png"
import cardback from "../images/cardback.jpg"
import chains from "../images/chains.png"
import damage from "../images/damage.png"
import forgedKey from "../images/forgedkey.png"
import power from "../images/power.png"
import stun from "../images/stun.png"
import underConstruction from "../images/under-construction.png"
import unforgedKey from "../images/unforgedkey.png"
import greenCardGlow from "../images/green-card-glow.png"
import orangeCardGlow from "../images/orange-card-glow.png"
import blueCardGlow from "../images/blue-card-glow.png"
import blueCardGlowSmall from "../images/blue-card-glow-small.png"
import maverick from "../images/card/maverick.png"
import legacy from "../images/card/legacy.png"

import CardPile from "./CardPile"
import CardDropZone from "./CardDropZone"
import Action from "../shared/Action"
import { CardInGame } from "../shared/gamestate/CardInGame"
import { Creature } from "../shared/gamestate/Creature"
import { GameState, PlayerState } from "../shared/gamestate/GameState"
import { InputEvent } from "./InputEvent"
import { getCardById, getCardOwner, getCardType } from "./StateUtils"
import { preloadCardsInPhaser } from "./Utils"
import CardType from "./CardType"
import Card from "./Card"
import CardWindow from "./CardWindow"
import SmallCard from "./SmallCard"
import { CARD_HEIGHT, CARD_WIDTH, SMALL_CARD_WIDTH, } from "./constants"
import ImageKey from "./ImageKey"
import Prompt from "./Prompt"
import { CardImage } from "./CardImage"

const { KeyCodes } = Phaser.Input.Keyboard

export const gameSceneHolder: { gameScene?: GameScene } = {
    gameScene: undefined
}

export enum PlayerPosition {
    TOP = "top",
    BOTTOM = "bottom"
}

class GameScene extends Phaser.Scene {
    state: GameState
    root: Phaser.GameObjects.Container | undefined
    cardHoverImage: CardImage | undefined
    creatureMousingOver: Phaser.GameObjects.GameObject | undefined
    artifactMousingOver: Phaser.GameObjects.GameObject | undefined
    cardInHandMousingOver: Phaser.GameObjects.GameObject | undefined
    modalContainer: Phaser.GameObjects.Container | undefined
    cameraControls: Phaser.Cameras.Controls.FixedKeyControl | undefined
    keysDown: {
        [key: string]: boolean
    }
    prompt: Prompt | undefined
    hoverOverCardTimeout: number | undefined
    cardWindow: CardWindow | undefined

    constructor(state: GameState, private playerId: string, private dispatch: (action: Action) => void, public width: number, public height: number) {
        super("GameScene")
        this.state = state
        this.keysDown = {}
        gameSceneHolder.gameScene = this
    }

    preload() {
        this.load.image(ImageKey.CARDBACK, cardback)
        this.load.image(ImageKey.UNFORGED_KEY, unforgedKey)
        this.load.image(ImageKey.FORGED_KEY, forgedKey)
        this.load.image(ImageKey.DAMAGE_TOKEN, damage)
        this.load.image(ImageKey.AMBER_TOKEN, amber)
        this.load.image(ImageKey.STUN_TOKEN, stun)
        this.load.image(ImageKey.ARMOR_TOKEN, armor)
        this.load.image(ImageKey.POWER_TOKEN, power)
        this.load.image(ImageKey.CHAINS, chains)
        this.load.image(ImageKey.DOOM_TOKEN, chains)
        this.load.image(ImageKey.UNDER_CONSTRUCTION, underConstruction)
        this.load.image(ImageKey.CARD_POWER, cardPower)
        this.load.image(ImageKey.ENHANCED_CARD_POWER, enhancedCardPower)
        this.load.image(ImageKey.GREEN_CARD_GLOW, greenCardGlow)
        this.load.image(ImageKey.ORANGE_CARD_GLOW, orangeCardGlow)
        this.load.image(ImageKey.BLUE_CARD_GLOW, blueCardGlow)
        this.load.image(ImageKey.BLUE_CARD_GLOW_SMALL, blueCardGlowSmall)
        this.load.image(ImageKey.MAVERICK, maverick)
        this.load.image(ImageKey.LEGACY, legacy)

        const state = this.state
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
        this.render()
        this.setupKeyboardListeners()

        this.cameras.main.setBounds(0, 0, CARD_WIDTH * 20, this.height)
        const cursors = this.input.keyboard.createCursorKeys()
        this.cameraControls = new Phaser.Cameras.Controls.FixedKeyControl({
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            speed: 1,
        })
        this.input.keyboard.removeCapture("SPACE, SHIFT, UP, DOWN")
        this.input.keyboard.disableGlobalCapture()
        this.input.on("gameout", () => {
            this.input.keyboard.enabled = false
        })

        this.input.on("gameover", () => {
            this.input.keyboard.enabled = true
        })

        this.input.on("pointermove", this.onMouseMove.bind(this))
    }

    update(time: number, delta: number) {
        this.cameraControls!.update(delta)
    }

    renderOpponentHand(hand: CardInGame[], originX: number, originY: number) {
        const width = CARD_WIDTH * 4
        const cardWidth = CARD_WIDTH * 0.8

        for (let i = 0; i < hand.length; i++) {
            const widthOfAllCards = hand.length * Math.min((width / hand.length), cardWidth)
            const x = i * Math.min((width / hand.length), cardWidth) - widthOfAllCards / 2 + this.width / 2
            const y = originY - CARD_HEIGHT * 0.3
            const card = new Phaser.GameObjects.Image(this, x, y, ImageKey.CARDBACK)
            card.setDisplaySize(CARD_WIDTH, CARD_HEIGHT)
            this.root!.add(card)
        }
    }

    renderHand(player: PlayerState, originX: number, originY: number) {
        const dispatch = this.dispatch
        const width = CARD_WIDTH * 4
        const cardWidth = CARD_WIDTH * 0.8

        for (let i = 0; i < player.hand.length; i++) {
            const widthOfAllCards = player.hand.length * Math.min((width / player.hand.length), cardWidth)
            const card = new Card({
                scene: this,
                x: i * Math.min((width / player.hand.length), cardWidth) - widthOfAllCards / 2 + this.width / 2,
                y: originY + CARD_HEIGHT * (0.5 + 0.3),
                id: player.hand[i].id,
                front: player.hand[i].backingCard.cardTitle,
                back: ImageKey.CARDBACK,
                draggable: true,
                backingCard: player.hand[i].backingCard,
                onClick: this.onClickCardInHand.bind(this),
                onMouseOver: this.onMouseOverCardInHand.bind(this),
                onMouseOut: this.onMouseOutCardInHand.bind(this),
                onDragStart: this.onDragStart.bind(this),
                onDragEnd: this.onDragEndCardInHand.bind(this),
            })
            this.root!.add(card)
        }

        const dropZoneWidth = width + 50
        const dropZoneX = this.width / 2
        const dropZoneY = originY + CARD_HEIGHT / 2
        const dropZone = new Phaser.GameObjects.Zone(this, dropZoneX, dropZoneY, dropZoneWidth, CARD_HEIGHT)
        dropZone.name = "hand"
        dropZone.setRectangleDropZone(dropZoneWidth, CARD_HEIGHT)
        dropZone.setDataEnabled()
        // @ts-ignore
        dropZone.data.set({
            onEnter: () => {
            },
            onLeave: () => {
            },
            onDrop: (card: Card) => {
                const cardType = getCardType(this.state, card.id)
                if (cardType === CardType.ARTIFACT) {
                    this.dispatch({
                        type: InputEvent.MoveArtifactToHand,
                        cardId: card.id,
                    })
                }
                if (cardType === CardType.CREATURE) {
                    dispatch({
                        type: InputEvent.MoveCreatureToHand,
                        cardId: card.id,
                    })
                }
                this.render()
            }
        })
        this.root!.add(dropZone)
        this.root!.sendToBack(dropZone)
    }

    renderCreatures(player: PlayerState, originX: number, originY: number) {
        const dispatch = this.dispatch
        let offsetX = 0

        for (let i = 0; i < player.creatures.length; i++) {
            const creature = player.creatures[i]
            let y = originY
            if (creature.taunt) {
                y += -15
            }

            if (i > 0) {
                const previousCreature = player.creatures[i - 1]
                offsetX += SMALL_CARD_WIDTH * 0.1 * previousCreature.cardsUnderneath.length
                offsetX += SMALL_CARD_WIDTH * 0.1 * previousCreature.upgrades.length
            }

            if (creature.ready) {
                offsetX += SMALL_CARD_WIDTH * 0.1
                offsetX += SMALL_CARD_WIDTH * 0.1 * creature.cardsUnderneath.length
            }

            const widthOfAllCards = player.creatures.length * SMALL_CARD_WIDTH
            const creatureCard = new SmallCard({
                scene: this,
                x: SMALL_CARD_WIDTH * 0.3 + SMALL_CARD_WIDTH * 1.05 * i + offsetX - widthOfAllCards / 2 + this.width / 2,
                y: y,
                id: creature.id,
                front: creature.backingCard.cardTitle,
                back: ImageKey.CARDBACK,
                faceup: creature.faceup,
                ready: creature.ready,
                cardsUnderneath: creature.cardsUnderneath,
                upgrades: creature.upgrades,
                draggable: true,
                backingCard: creature.backingCard,
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
            creatureCard.render()
            this.root!.add(creatureCard)

            const onDropUpgrade = (droppedCard: Card) => {
                const droppedCardId = droppedCard.id
                if (getCardType(this.state, droppedCardId) !== CardType.HAND)
                    return

                dispatch({
                    type: InputEvent.PlayUpgrade,
                    upgradeId: droppedCard.id,
                    creatureId: creatureCard.id,
                    player: player.player
                })
                droppedCard.destroy()
                this.render()
            }

            const upgradeDropZone = new CardDropZone(this, "upgrade", creatureCard.x, originY, onDropUpgrade)
            upgradeDropZone.allowCardTypes = [CardType.UPGRADE]
            upgradeDropZone.visible = false
            upgradeDropZone.render()
        }
    }

    renderArtifacts(player: PlayerState, originX: number, originY: number) {
        const dispatch = this.dispatch
        let artifactOffsetX = 0

        for (let i = 0; i < player.artifacts.length; i++) {
            const artifact = player.artifacts[i]

            if (i > 0) {
                const previousArtifact = player.artifacts[i - 1]
                artifactOffsetX += (SMALL_CARD_WIDTH * 0.1) * previousArtifact.cardsUnderneath.length
            }

            if (artifact.ready) {
                artifactOffsetX += SMALL_CARD_WIDTH * 0.1
                artifactOffsetX += SMALL_CARD_WIDTH * 0.1 * artifact.cardsUnderneath.length
            }

            const widthOfAllCards = player.artifacts.length * SMALL_CARD_WIDTH
            const card = new SmallCard({
                scene: this,
                x: SMALL_CARD_WIDTH * 0.3 + SMALL_CARD_WIDTH * 1.05 * i + artifactOffsetX - widthOfAllCards / 2 + this.width / 2,
                y: originY,
                id: artifact.id,
                front: artifact.backingCard.cardTitle,
                back: ImageKey.CARDBACK,
                faceup: artifact.faceup,
                ready: artifact.ready,
                cardsUnderneath: artifact.cardsUnderneath,
                draggable: true,
                backingCard: artifact.backingCard,
                onClick: this.onClickArtifact.bind(this),
                onMouseOver: this.onMouseOverArtifact.bind(this),
                onMouseOut: this.onMouseOutArtifact.bind(this),
                onDragStart: this.onDragStart.bind(this),
            })
            Object.keys(artifact.tokens)
                .forEach(token => {
                    // @ts-ignore
                    const tokenAmount = artifact.tokens[token]
                    card.addToken({
                        type: token,
                        amount: tokenAmount,
                    })
                })
            card.render()
            this.root!.add(card)
        }
    }

    renderOpponentsPlayerBoard(player: PlayerState, originX: number, originY: number, playerPosition: PlayerPosition) {
        const dispatch = this.dispatch

        const playerDataOffsetX = CARD_WIDTH * 8
        const playerNameY = originY - CARD_HEIGHT * 0.30
        const playerNameText = new Phaser.GameObjects.Text(this, originX, playerNameY, player.player.name, {
            color: "#fff",
            stroke: "#000",
            strokeThickness: 4,
            fontSize: "20px"
        })
        this.root!.add(playerNameText)

        const amberImageY = originY - CARD_HEIGHT * 0.1
        const amberTextY = amberImageY + 20
        const chainImageY = originY
        const chainTextY = chainImageY + 15
        const keySize = 40

        const amberImage = new Phaser.GameObjects.Image(this, originX + keySize * 4, amberImageY, "amber-token")
        amberImage.setDisplaySize(40, 40)
        amberImage.setOrigin(0)
        amberImage.setInteractive({ cursor: "pointer" })
        amberImage.addListener("pointerup", (pointer: Phaser.Input.Pointer) => {
            dispatch({
                type: InputEvent.AlterPlayerAmber,
                amount: pointer.button === 2 ? -1 : 1,
                player: player.player
            })
            this.render()
        })
        this.root!.add(amberImage)

        const amberText = new Phaser.GameObjects.Text(this, originX + keySize * 4 + 20, amberTextY, player.amber.toString(), {
            color: "#fff",
            stroke: "#000",
            strokeThickness: 4,
            fontSize: "28px"
        })
        amberText.setOrigin(0.5)
        this.root!.add(amberText)

        const chainsImage = new Phaser.GameObjects.Image(this, originX + keySize * 5 + 15, chainImageY, ImageKey.CHAINS)
        chainsImage.setDisplaySize(30, 30)
        chainsImage.setOrigin(0)
        chainsImage.setInteractive({ cursor: "pointer" })
        chainsImage.addListener("pointerup", (pointer: Phaser.Input.Pointer) => {
            dispatch({
                type: InputEvent.AlterPlayerChains,
                amount: pointer.button === 2 ? -1 : 1,
                player: player.player
            })
            this.render()
        })
        this.root!.add(chainsImage)

        const chainsText = new Phaser.GameObjects.Text(this, originX + keySize * 5 + 30, chainTextY, player.chains.toString(), {
            color: "#fff",
            stroke: "#000",
            strokeThickness: 4,
            fontSize: "18px"
        })
        chainsText.setOrigin(0.5)
        this.root!.add(chainsText)

        for (let i = 0; i < 3; i++) {
            const textureId = player.keys >= i + 1 ? ImageKey.FORGED_KEY : ImageKey.UNFORGED_KEY
            const keyImage = new Phaser.GameObjects.Image(this, originX + keySize * i + i * 5, originY - CARD_HEIGHT * 0.1, textureId)
            keyImage.setDisplaySize(keySize, keySize)
            keyImage.setOrigin(0)
            keyImage.setInteractive({ cursor: "pointer" })
            keyImage.addListener("pointerup", (pointer: Phaser.Input.Pointer) => {
                dispatch({
                    type: pointer.button === 2 ? InputEvent.UnForgeKey : InputEvent.ForgeKey,
                    player: player.player
                })
                this.render()
            })
            this.root!.add(keyImage)
        }

        const cardPileTextY = originY + CARD_HEIGHT * 0.30

        const discardPileX = originX + CARD_WIDTH * (0.35 * 7) + 30
        const discardPileY = originY + CARD_HEIGHT * 0.65

        const onClickDiscardPile = (pointer: Phaser.Input.Pointer) => {
            if (pointer.button === 2) {
                if (this.cardWindow) this.cardWindow.destroy()
                this.cardWindow = new CardWindow({
                    scene: this,
                    cards: player.discard,
                    onClick: () => {
                    },
                })
                this.cardWindow.render()
            }
        }

        const discardPile = new CardPile({
            scene: this,
            x: discardPileX,
            y: discardPileY,
            name: "Discard",
            cards: player.discard,
            cardDropZoneOptions: {
                getCardImage: () => player.discard.length === 0 ? ImageKey.CARDBACK : player.discard[player.discard.length - 1].id,
                getMinimumAlpha: () => player.discard.length === 0 ? 0.3 : 1,
                onClick: onClickDiscardPile,
            }
        })
        discardPile.render()

        const drawPileX = originX + CARD_WIDTH * (0.35 * 5) + 20
        const drawPileY = originY + CARD_HEIGHT * 0.65
        const onClickDrawPile = (pointer: Phaser.Input.Pointer) => {
            if (pointer.button === 2) {
                if (this.cardWindow) this.cardWindow.destroy()
                this.cardWindow = new CardWindow({
                    scene: this,
                    cards: player.library.reverse(),
                    onClick: () => {
                    },
                })
            }
        }
        const drawPile = new CardPile({
            scene: this,
            x: drawPileX,
            y: drawPileY,
            name: "Draw",
            cards: player.library,
            cardDropZoneOptions: {
                getMinimumAlpha: () => player.library.length === 0 ? 0.3 : 1,
                onClick: onClickDrawPile,
            }
        })
        drawPile.render()

        const archivePileX = originX + CARD_WIDTH * (0.35 * 3) + 10
        const archivePileY = originY + CARD_HEIGHT * 0.65
        const archivePile = new CardPile({
            scene: this,
            x: archivePileX,
            y: archivePileY,
            name: "Archive",
            cards: player.archives,
            cardDropZoneOptions: {
                getMinimumAlpha: () => player.archives.length === 0 ? 0.3 : 1,
                onClick: (pointer: Phaser.Input.Pointer) => {
                    if (pointer.button !== 2)
                        return
                    if (this.cardWindow) this.cardWindow.destroy()
                    this.cardWindow = new CardWindow({
                        scene: this,
                        cards: player.archives,
                        onClick: () => {
                        },
                    })
                    this.cardWindow.render()
                }
            }
        })
        archivePile.render()

        const purgePileX = originX + CARD_WIDTH * 0.35
        const purgePileY = originY + CARD_HEIGHT * 0.65
        const purgePile = new CardPile({
            scene: this,
            x: purgePileX,
            y: purgePileY,
            name: "Purged",
            cards: player.purged,
            cardDropZoneOptions: {
                getCardImage: () => player.purged.length === 0 ? ImageKey.CARDBACK : player.purged[player.purged.length - 1].id,
                getMinimumAlpha: () => player.purged.length === 0 ? 0.3 : 1,
                onClick: () => {
                    // Open purge modal
                }
            }
        })
        purgePile.render()
    }

    renderPlayerBoard(player: PlayerState, originX: number, originY: number, playerPosition: PlayerPosition) {
        const dispatch = this.dispatch

        const playerDataOffsetX = CARD_WIDTH * 8
        const playerNameY = originY - CARD_HEIGHT * 0.30
        const playerNameText = new Phaser.GameObjects.Text(this, originX, playerNameY, player.player.name, {
            color: "#fff",
            stroke: "#000",
            strokeThickness: 4,
            fontSize: "20px"
        })
        this.root!.add(playerNameText)

        const amberImageY = originY - CARD_HEIGHT * 0.1
        const amberTextY = amberImageY + 20
        const chainImageY = originY
        const chainTextY = chainImageY + 15
        const keySize = 40

        const amberImage = new Phaser.GameObjects.Image(this, originX + keySize * 4, amberImageY, "amber-token")
        amberImage.setDisplaySize(40, 40)
        amberImage.setOrigin(0)
        amberImage.setInteractive({ cursor: "pointer" })
        amberImage.addListener("pointerup", (pointer: Phaser.Input.Pointer) => {
            dispatch({
                type: InputEvent.AlterPlayerAmber,
                amount: pointer.button === 2 ? -1 : 1,
                player: player.player
            })
            this.render()
        })
        this.root!.add(amberImage)

        const amberText = new Phaser.GameObjects.Text(this, originX + keySize * 4 + 20, amberTextY, player.amber.toString(), {
            color: "#fff",
            stroke: "#000",
            strokeThickness: 4,
            fontSize: "28px"
        })
        amberText.setOrigin(0.5)
        this.root!.add(amberText)

        const chainsImage = new Phaser.GameObjects.Image(this, originX + keySize * 5 + 15, chainImageY, ImageKey.CHAINS)
        chainsImage.setDisplaySize(30, 30)
        chainsImage.setOrigin(0)
        chainsImage.setInteractive({ cursor: "pointer" })
        chainsImage.addListener("pointerup", (pointer: Phaser.Input.Pointer) => {
            dispatch({
                type: InputEvent.AlterPlayerChains,
                amount: pointer.button === 2 ? -1 : 1,
                player: player.player
            })
            this.render()
        })
        this.root!.add(chainsImage)

        const chainsText = new Phaser.GameObjects.Text(this, originX + keySize * 5 + 30, chainTextY, player.chains.toString(), {
            color: "#fff",
            stroke: "#000",
            strokeThickness: 4,
            fontSize: "18px"
        })
        chainsText.setOrigin(0.5)
        this.root!.add(chainsText)

        for (let i = 0; i < 3; i++) {
            const textureId = player.keys >= i + 1 ? ImageKey.FORGED_KEY : ImageKey.UNFORGED_KEY
            const keyImage = new Phaser.GameObjects.Image(this, originX + keySize * i + i * 5, originY - CARD_HEIGHT * 0.1, textureId)
            keyImage.setDisplaySize(keySize, keySize)
            keyImage.setOrigin(0)
            keyImage.setInteractive({ cursor: "pointer" })
            keyImage.addListener("pointerup", (pointer: Phaser.Input.Pointer) => {
                dispatch({
                    type: pointer.button === 2 ? InputEvent.UnForgeKey : InputEvent.ForgeKey,
                    player: player.player
                })
                this.render()
            })
            this.root!.add(keyImage)
        }

        const cardPileTextY = originY + CARD_HEIGHT * 0.30

        const discardPileX = originX + CARD_WIDTH * (0.35 * 7) + 30
        const discardPileY = originY + CARD_HEIGHT * 0.65

        const onDropInDiscardPile = (card: Card) => {
            dispatch({
                type: InputEvent.DiscardCard,
                cardId: card.id,
                player: player.player
            })
            this.render()
        }

        const onClickDiscardPile = (pointer: Phaser.Input.Pointer) => {
            if (pointer.button === 2) {
                if (this.cardWindow) this.cardWindow.destroy()
                this.cardWindow = new CardWindow({
                    scene: this,
                    cards: player.discard,
                    onClick: (card: CardInGame) => {
                        dispatch({
                            type: InputEvent.MoveCardFromDiscardToHand,
                            cardId: card.id,
                            player: player.player
                        })
                        this.render()
                    }
                })
                this.cardWindow.render()
            } else {
                if (pointer.event.shiftKey) {
                    dispatch({
                        type: InputEvent.ShuffleDiscardIntoDeck,
                        player: player.player,
                    })
                } else {
                    dispatch({
                        type: InputEvent.DrawFromDiscard,
                        player: player.player,
                    })
                }
                this.render()
            }
        }

        const discardPile = new CardPile({
            scene: this,
            x: discardPileX,
            y: discardPileY,
            name: "Discard",
            cards: player.discard,
            cardDropZoneOptions: {
                allowCardTypes: [CardType.HAND, CardType.CREATURE, CardType.ARTIFACT, CardType.UPGRADE],
                getCardImage: () => player.discard.length === 0 ? ImageKey.CARDBACK : player.discard[player.discard.length - 1].id,
                getMinimumAlpha: () => player.discard.length === 0 ? 0.3 : 1,
                onDrop: onDropInDiscardPile,
                onClick: onClickDiscardPile,
            }
        })
        discardPile.render()

        const drawPileX = originX + CARD_WIDTH * (0.35 * 5) + 20
        const drawPileY = originY + CARD_HEIGHT * 0.65
        const onDropDrawPile = (card: Card) => {
            dispatch({
                type: InputEvent.PutCardOnDrawPile,
                cardId: card.id,
                player: player.player
            })
            this.render()
        }
        const onClickDrawPile = (pointer: Phaser.Input.Pointer) => {
            if (pointer.button === 2) {
                if (this.cardWindow) this.cardWindow.destroy()
                this.cardWindow = new CardWindow({
                    scene: this,
                    cards: player.library.reverse(),
                    onClick: (card: CardInGame) => {
                        dispatch({
                            type: InputEvent.MoveCardFromDrawPileToHand,
                            cardId: card.id,
                            player: player.player
                        })
                        this.render()
                    }
                })
                this.cardWindow.render()
            } else {
                dispatch({
                    type: pointer.event.shiftKey ? InputEvent.ShuffleDeck : InputEvent.DrawCard,
                    player: player.player,
                })
                this.render()
            }
        }

        const drawPile = new CardPile({
            scene: this,
            x: drawPileX,
            y: drawPileY,
            name: "Draw",
            cards: player.library,
            cardDropZoneOptions: {
                allowCardTypes: [CardType.HAND, CardType.CREATURE, CardType.ARTIFACT, CardType.UPGRADE],
                getMinimumAlpha: () => player.library.length === 0 ? 0.3 : 1,
                onClick: onClickDrawPile,
                onDrop: onDropDrawPile,
            }
        })
        drawPile.render()

        const archivePileX = originX + CARD_WIDTH * (0.35 * 3) + 10
        const archivePileY = originY + CARD_HEIGHT * 0.65
        const archivePile = new CardPile({
            scene: this,
            x: archivePileX,
            y: archivePileY,
            name: "Archive",
            cards: player.archives,
            cardDropZoneOptions: {
                getMinimumAlpha: () => player.archives.length === 0 ? 0.3 : 1,
                allowCardTypes: [CardType.HAND, CardType.CREATURE, CardType.ARTIFACT],
                onDrop: (card: Card) => {
                    dispatch({
                        type: InputEvent.ArchiveCard,
                        cardId: card.id,
                        player: player.player
                    })
                    this.render()
                },
                onClick: (pointer: Phaser.Input.Pointer) => {
                    if (pointer.button !== 2)
                        return
                    if (this.cardWindow) this.cardWindow.destroy()
                    this.cardWindow = new CardWindow({
                        scene: this,
                        cards: player.archives,
                        onClick: (card: CardInGame) => {
                            dispatch({
                                type: InputEvent.MoveCardFromArchiveToHand,
                                cardId: card.id,
                                player: player.player
                            })
                            this.render()
                        }
                    })
                    this.cardWindow.render()
                }
            }
        })
        archivePile.render()

        const purgePileX = originX + CARD_WIDTH * 0.35
        const purgePileY = originY + CARD_HEIGHT * 0.65
        const purgePile = new CardPile({
            scene: this,
            x: purgePileX,
            y: purgePileY,
            name: "Purged",
            cards: player.purged,
            cardDropZoneOptions: {
                getCardImage: () => player.purged.length === 0 ? ImageKey.CARDBACK : player.purged[player.purged.length - 1].id,
                getMinimumAlpha: () => player.purged.length === 0 ? 0.3 : 1,
                allowCardTypes: [CardType.HAND, CardType.CREATURE, CardType.ARTIFACT, CardType.UPGRADE],
                onDrop: (card: Card) => {
                    dispatch({
                        type: InputEvent.PurgeCard,
                        cardId: card.id,
                        player: player.player
                    })
                    this.render()
                },
                onClick: (pointer: Phaser.Input.Pointer) => {
                    if (pointer.button !== 2)
                        return
                    if (this.cardWindow) this.cardWindow.destroy()
                    this.cardWindow = new CardWindow({
                        scene: this,
                        cards: player.purged,
                        onClick: () => {
                            this.render()
                        }
                    })
                    this.cardWindow.render()
                }
            }
        })
        purgePile.render()
    }

    render() {
        if (this.root) {
            this.root.list.forEach((obj: Phaser.GameObjects.GameObject) => obj.destroy())
            this.root.destroy()
            this.creatureMousingOver = undefined
            this.artifactMousingOver = undefined
            this.cardInHandMousingOver = undefined
        }
        this.root! = this.add.container(0, 0)

        let opponentState
        let ownState
        if (this.playerId === this.state.playerTwoState.player.id) {
            ownState = this.state.playerTwoState
            opponentState = this.state.playerOneState
        } else {
            ownState = this.state.playerOneState
            opponentState = this.state.playerTwoState
        }

        this.renderOpponentsPlayerBoard(opponentState, 5, CARD_HEIGHT * 0.35, PlayerPosition.TOP)
        this.renderOpponentHand(opponentState.hand, 5, CARD_HEIGHT * 0.35)
        this.renderCreatures(opponentState, 5, CARD_HEIGHT * 1.75)
        this.renderArtifacts(opponentState, 5, CARD_HEIGHT)

        this.renderPlayerBoard(ownState, 5, this.height - CARD_HEIGHT, PlayerPosition.BOTTOM)
        this.renderHand(ownState, 5, this.height - CARD_HEIGHT)
        this.renderCreatures(ownState, 5, this.height - CARD_HEIGHT * 2.05)
        this.renderArtifacts(ownState, 5, this.height - CARD_HEIGHT * 1.25)

        if (this.modalContainer) {
            this.modalContainer.destroy()
            delete this.modalContainer
        }
    }

    onMouseOverCreature(e: MouseEvent, card: Card) {
        const texture = card.id
        this.creatureMousingOver = card

        clearTimeout(this.hoverOverCardTimeout)
        this.hoverOverCardTimeout = window.setTimeout(() => {
            this.showEnlargedCard(texture, card)
        }, 700)

        if (this.prompt) {
            const owner = getCardOwner(card.id, this.state)
            const cardInGame = getCardById(owner, card.id)
            this.prompt.onMouseOverCard(cardInGame!, card)
        }
    }

    onMouseOutCreature() {
        clearTimeout(this.hoverOverCardTimeout)
        if (this.cardHoverImage) {
            this.cardHoverImage.destroy()
        }

        if (this.prompt && this.creatureMousingOver) {
            const card = this.creatureMousingOver as Card
            const owner = getCardOwner(card.id, this.state)
            const cardInGame = getCardById(owner, card.id)
            this.prompt.onMouseOutCard(cardInGame!, card)
        }

        this.creatureMousingOver = undefined
    }

    onClickCreature(e: MouseEvent, card: Card) {
        const dispatch = this.dispatch
        const cardId = card.id

        if (this.prompt) {
            const owner = getCardOwner(card.id, this.state)
            const cardInGame = getCardById(owner, card.id)
            this.prompt.onClickCard(cardInGame!, card)
            return
        }

        if (this.keysDown[KeyCodes.R]) {
            dispatch({
                type: InputEvent.MoveCreatureRight,
                cardId,
            })
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.L]) {
            dispatch({
                type: InputEvent.MoveCreatureLeft,
                cardId,
            })
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.B]) {
            dispatch({
                type: InputEvent.DiscardCard,
                cardId,
            })
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.M]) {
            dispatch({
                type: InputEvent.MoveCreatureToHand,
                cardId,
            })
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.S]) {
            dispatch({
                type: InputEvent.ToggleStun,
                cardId,
            })
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.C]) {
            dispatch({
                type: InputEvent.CaptureAmber,
                cardId,
                amount: e.button === 2 ? -1 : 1
            })
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.T]) {
            dispatch({
                type: InputEvent.ToggleTaunt,
                cardId,
            })
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.P]) {
            dispatch({
                type: InputEvent.AlterCreaturePower,
                cardId,
                amount: e.button === 2 ? -1 : 1
            })
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.D]) {
            dispatch({
                type: InputEvent.AlterCreatureDamage,
                cardId,
                amount: e.button === 2 ? -1 : 1
            })
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.X]) {
            dispatch({
                type: InputEvent.ToggleDoomToken,
                cardId,
            })
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.A]) {
            dispatch({
                type: InputEvent.AddAmberToCard,
                cardId,
                amount: e.button === 2 ? -1 : 1
            })
            this.render()
            return
        }

        dispatch({
            type: InputEvent.UseCreature,
            cardId,
        })
        this.render()
    }

    onMouseOverArtifact(e: MouseEvent, target: Card) {
        const texture = target.id
        this.artifactMousingOver = target
        clearTimeout(this.hoverOverCardTimeout)
        this.hoverOverCardTimeout = window.setTimeout(() => {
            this.showEnlargedCard(texture, target)
        }, 700)
    }

    onMouseOutArtifact() {
        this.artifactMousingOver = undefined
        clearTimeout(this.hoverOverCardTimeout)

        if (this.cardHoverImage) {
            this.cardHoverImage.destroy()
        }
    }

    onClickArtifact(e: MouseEvent, card: Card) {
        const cardId = card.id

        if (this.keysDown[KeyCodes.B]) {
            this.dispatch({
                type: InputEvent.DiscardCard,
                cardId,
            })
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.M]) {
            this.dispatch({
                type: InputEvent.MoveArtifactToHand,
                cardId,
            })
            this.render()
            return
        }

        if (this.keysDown[KeyCodes.A]) {
            this.dispatch({
                type: InputEvent.AddAmberToCard,
                cardId,
                amount: e.button === 2 ? -1 : 1
            })
            this.render()
            return
        }

        this.dispatch({
            type: InputEvent.UseArtifact,
            cardId,
        })
        this.render()
    }

    onClickCardInHand(e: MouseEvent, card: Card) {
        const dispatch = this.dispatch
        const cardId = card.id

        if (this.keysDown[KeyCodes.B]) {
            dispatch({
                type: InputEvent.DiscardCard,
                cardId,
            })
            this.render()
            return
        }

        this.render()
    }

    onMouseOverCardInHand(e: MouseEvent, target: Card) {
        const texture = target.id
        this.cardInHandMousingOver = target
        this.showEnlargedCard(texture, target)
    }

    onMouseOutCardInHand() {
        this.cardInHandMousingOver = undefined

        if (this.cardHoverImage) {
            this.cardHoverImage.destroy()
        }
    }

    onDragEndCardInHand(card: Card) {
        const distY = card._originY - card.y
        if (distY > CARD_HEIGHT / 2) {
            const cardId = card.id
            const cardType = card.backingCard.cardType
            if (cardType === "Artifact") {
                this.dispatch({
                    type: InputEvent.PlayArtifact,
                    cardId,
                })
            }
            if (cardType === "Creature") {
                if (card.x < this.width / 2) {
                    this.dispatch({
                        type: InputEvent.PlayCreature,
                        cardId,
                        flank: "left",
                    })
                } else {
                    this.dispatch({
                        type: InputEvent.PlayCreature,
                        cardId,
                        flank: "right",
                    })
                }
            }
            if (cardType === "Action") {
                this.dispatch({
                    type: InputEvent.PlayAction,
                    cardId,
                })
            }
        } else {
            this.render()
        }
    }

    onMouseOverUpgrade(e: MouseEvent, target: Card) {
        const texture = target.data.get("id")
        this.creatureMousingOver = target
        clearTimeout(this.hoverOverCardTimeout)
        this.hoverOverCardTimeout = window.setTimeout(() => {
            this.showEnlargedCard(texture, target)
        }, 700)
    }

    onMouseOutUpgrade() {
        this.creatureMousingOver = undefined
        clearTimeout(this.hoverOverCardTimeout)

        if (this.cardHoverImage) {
            this.cardHoverImage.destroy()
        }
    }

    onDragStart(card: Phaser.GameObjects.Image, pointer: Phaser.Input.Pointer) {
        this.creatureMousingOver = undefined
        this.artifactMousingOver = undefined
        this.cardInHandMousingOver = undefined

        // @ts-ignore
        const cardId = card.id
        const cardType = getCardType(this.state, cardId)

        if (cardType === CardType.HAND) {
            card.setPosition(pointer.x, pointer.y)
        }

        if (this.cardHoverImage) {
            this.cardHoverImage.destroy()
        }
    }

    showEnlargedCard(texture: string, card?: Card) {
        if (texture === ImageKey.CARDBACK)
            return
        const width = 250
        const height = width / .716612378
        let x = this.width - width / 2 - 10
        let y = height / 2 + 10

        if (this.creatureMousingOver) {
            const creature = this.creatureMousingOver as Phaser.GameObjects.Container
            x = creature.x + SMALL_CARD_WIDTH / 2 + width / 2 + 10
            y = creature.y
        }

        if (this.artifactMousingOver) {
            const artifact = this.artifactMousingOver as Phaser.GameObjects.Container
            x = artifact.x + SMALL_CARD_WIDTH / 2 + width / 2 + 10
            y = artifact.y
        }
        const cardImage = new CardImage(this, width, height, card!.backingCard)
        cardImage.render()
        this.root!.add(cardImage)
        this.cardHoverImage = cardImage
        this.cardHoverImage.setPosition(x, y)
    }

    setupKeyboardListeners() {
        this.input.keyboard.on("keydown", (e: MouseEvent) => {
            this.keysDown[e.which] = true
        })

        this.input.keyboard.on("keyup", (e: MouseEvent) => {
            this.keysDown[e.which] = false
        })
    }

    async showPrompt(p: Prompt) {
        this.prompt = p
        const selection = await this.prompt.addToScene(this)
        delete this.prompt
        return selection
    }

    onMouseMove(pointer: Phaser.Input.Pointer) {
        if (this.prompt) {
            this.prompt.onMouseMove(pointer)
        }
    }
}

export default GameScene
