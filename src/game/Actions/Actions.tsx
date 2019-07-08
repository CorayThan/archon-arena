import { Event } from "../Event"
import { log } from "../../Utils"
import {
    getCardOwner,
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
import CardInHand from "../types/CardInHand"

import CreatureActions from "./Creature"
import ArtifactActions from "./Artifact"

export const exec = (action: any, state: any) => {

    const actionHandlers: { [key: string]: Function } = {
        [Event.PlayUpgrade]: () => {
            const owner = getCardOwner(action.upgrade, state)
            const upgrade = getCardInHandByID(owner, action.upgradeID)
            if (!upgrade)
                throw new Error(`Card ${action.upgradeID} not found in hand`)
            const creature = getCreatureByID(owner, action.creatureID)
            if (!creature)
                throw new Error(`Card ${action.creatureID} not found in field`)
            creature.upgrades.push(upgrade)
            removeCardFromHand(owner, action.upgrade)
        },
        [Event.DiscardCard]: () => {
            const owner = getCardOwner(action.cardID, state)
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
        [Event.ShuffleDeck]: () => {
            const player = getPlayerByName(action.playerName, state)
            shuffleDeck(player)
        },
        [Event.ArchiveCard]: () => {
            const owner = getCardOwner(action.cardID, state)
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
