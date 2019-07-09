import { Event } from "../Event"
import { log } from "../../Utils"
import {
    getCardOwner,
    getCardByID,
    getCardType,
    getCreatureByID,
    getArtifactByID,
    getCardInHandByID,
    removeCreature,
    removeArtifact,
    removeUpgrade,
    removeCardFromHand,
    removeCardByID,
    getPlayerByName,
    shuffleDeck,
} from "../StateUtils"
import Creature from "../types/Creature"
import Artifact from "../types/Artifact"
import Player from "../types/Player"
import CardInHand from "../types/CardInHand"

import CreatureActions from "./Creature"
import ArtifactActions from "./Artifact"

export const exec = (action: any, state: any) => {

    const actionHandlers: { [key: string]: Function } = {
        [Event.PlayUpgrade]: () => {
            const owner: Player = getCardOwner(action.upgradeID, state)
            const upgrade = getCardInHandByID(owner, action.upgradeID)
            if (!upgrade)
                throw new Error(`Card ${action.upgradeID} not found in hand`)
            const creature = getCreatureByID(owner, action.creatureID)
            if (!creature)
                throw new Error(`Card ${action.creatureID} not found in field`)
            creature.upgrades.push(upgrade)
            removeCardFromHand(owner, action.upgradeID)
        },
        [Event.PlayAction]: () => {
            const owner: Player = getCardOwner(action.upgradeID, state)
            const card = getCardInHandByID(owner, action.cardID)
            if (!card)
                throw new Error(`Card ${action.cardID} not found in hand`)
            removeCardFromHand(owner, action.cardID)
            owner.discardPile.push(card)
        },
        [Event.ShuffleDeck]: () => {
            const player = getPlayerByName(action.playerName, state)
            shuffleDeck(player)
        },
        [Event.DiscardCard]: () => {
            const owner: Player = getCardOwner(action.cardID, state)
            const card = removeCardByID(owner, action.cardID)
            if (card.cardsUnderneath) {
                card.cardsUnderneath.forEach((cardUnderneath: Creature | Artifact | CardInHand) => {
                    owner.discardPile.push(cardUnderneath)
                })
                card.cardsUnderneath = []
            }
            if (card.upgrades) {
                card.upgrades.forEach((upgrade: Creature | Artifact | CardInHand) => {
                    owner.discardPile.push(upgrade)
                })
                card.upgrades = []
            }
            owner.discardPile.push(card)
        },
        [Event.PutCardOnDrawPile]: () => {
            const owner: Player = getCardOwner(action.cardID, state)
            const card = removeCardByID(owner, action.cardID)
            if (card.cardsUnderneath) {
                card.cardsUnderneath.forEach((cardUnderneath: Creature | Artifact | CardInHand) => {
                    owner.discardPile.push(cardUnderneath)
                })
                card.cardsUnderneath = []
            }
            if (card.upgrades) {
                card.upgrades.forEach((upgrade: Creature | Artifact | CardInHand) => {
                    owner.discardPile.push(upgrade)
                })
                card.upgrades = []
            }
            owner.drawPile.unshift(card)
        },
        [Event.ArchiveCard]: () => {
            const owner: Player = getCardOwner(action.cardID, state)
            const card = removeCardByID(owner, action.cardID)
            if (card.cardsUnderneath) {
                card.cardsUnderneath.forEach((cardUnderneath: Creature | Artifact | CardInHand) => {
                    owner.discardPile.push(cardUnderneath)
                })
            }
            if (card.upgrades) {
                card.upgrades.forEach((upgrade: Creature | Artifact | CardInHand) => {
                    owner.discardPile.push(upgrade)
                })
            }
            owner.archivePile.push(card)
        },
        [Event.DrawCard]: () => {
            const player = getPlayerByName(action.playerName, state)

            if (player.drawPile.length === 0)
                shuffleDeck(player)

            if (player.drawPile.length === 0)
                return

            player.hand.push(player.drawPile.shift())
        },
        [Event.AddAmberToCard]: () => {
            const owner: Player = getCardOwner(action.cardID, state)
            const cardType = getCardType(action.cardID)
            if (cardType === "creature") {
                const creature = getCreatureByID(owner, action.cardID)
                if (!creature)
                    throw new Error(`Card ${action.cardID} not found`)
                creature.tokens.amber += action.amount
                creature.tokens.amber = Math.max(creature.tokens.amber, 0)
            } else if (cardType === "artifact") {
                const artifact = getArtifactByID(owner, action.cardID)
                if (!artifact)
                    throw new Error(`Card ${action.cardID} not found`)
                artifact.tokens.amber += action.amount
                artifact.tokens.amber = Math.max(artifact.tokens.amber, 0)
            }
        },
        [Event.AlterPlayerChains]: () => {
            const player = getPlayerByName(action.playerName, state)
            player.chains += action.amount
            player.chains = Math.max(player.chains, 0)
        },
        [Event.AlterPlayerAmber]: () => {
            const player = getPlayerByName(action.playerName, state)
            player.amber += action.amount
            player.amber = Math.max(player.amber, 0)
        },
        [Event.ForgeKey]: () => {
            const player = getPlayerByName(action.playerName, state)
            if (player.keys < 3)
                player.keys += 1
        },
        [Event.UnForgeKey]: () => {
            const player = getPlayerByName(action.playerName, state)
            if (player.keys > 0)
                player.keys -= 1
        },
        [Event.EndTurn]: () => {
            const player = state.players.find((p: any) => p.name === state.activePlayer)
            player.creatures.forEach((c: any) => c.ready = true)
            player.artifacts.forEach((c: any) => c.ready = true)

            const handSize = 6
            for (let i = player.hand.length; i < handSize; i++) {
                player.hand.push({
                    name: 'Kelifi Dragon',
                    id: 'kelifi-dragon',
                })
            }

            const newActivePlayer = state.players[0] === player ? state.players[1].name : state.players[0].name
            state.activePlayer = newActivePlayer
        },
    }

    Object.assign(actionHandlers, CreatureActions)
    Object.assign(actionHandlers, ArtifactActions)

    // Add placeholder function for unimplemented events
    Object.keys(Event)
        .forEach(event => {
            if (!actionHandlers[event])
                actionHandlers[event] = () => {}
        })

    actionHandlers[action.type](action, state)
}
