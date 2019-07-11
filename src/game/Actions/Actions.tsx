import { shuffle } from "lodash"
import { Event } from "../Event"
import {
    discardCardsUnderneath,
    discardCreatureUpgrades,
    getArtifactByID,
    getCardInArchiveByID,
    getCardInDiscardByID,
    getCardInDrawPileByID,
    getCardInHandByID,
    getCardOwner,
    getCardType,
    getCreatureByID,
    getPlayerByName,
    removeCardByID,
    removeCardFromHand,
} from "../StateUtils"
import CardInHand from "../types/CardInHand"
import Player from "../types/Player"
import ArtifactActions from "./Artifact"

import CreatureActions from "./Creature"

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
            player.drawPile = shuffle(player.drawPile)
        },
        [Event.ShuffleDiscardIntoDeck]: () => {
            const player = getPlayerByName(action.playerName, state)
            player.discardPile.forEach((card: CardInHand) => player.drawPile.push(card))
            player.discardPile = []
            player.drawPile = shuffle(player.drawPile)
        },
        [Event.DiscardCard]: () => {
            const owner: Player = getCardOwner(action.cardID, state)
            discardCreatureUpgrades(owner, action.cardID)
            discardCardsUnderneath(owner, action.cardID)
            const card = removeCardByID(owner, action.cardID)
            owner.discardPile.push(card)
        },
        [Event.PutCardOnDrawPile]: () => {
            const owner: Player = getCardOwner(action.cardID, state)
            discardCreatureUpgrades(owner, action.cardID)
            discardCardsUnderneath(owner, action.cardID)
            const card = removeCardByID(owner, action.cardID)
            owner.drawPile.unshift(card)
        },
        [Event.MoveCardFromDiscardToHand]: () => {
            const owner: Player = getCardOwner(action.cardID, state)
            const card = getCardInDiscardByID(owner, action.cardID)
            if (!card)
                throw new Error(`Card ${action.cardID} not found in discard`)
            owner.discardPile = owner.discardPile.filter((c: CardInHand) => c !== card)
            owner.hand.push(card)
        },
        [Event.MoveCardFromDrawPileToHand]: () => {
            const owner: Player = getCardOwner(action.cardID, state)
            const card = getCardInDrawPileByID(owner, action.cardID)
            if (!card)
                throw new Error(`Card ${action.cardID} not found in draw pile`)
            owner.drawPile = owner.drawPile.filter((c: CardInHand) => c !== card)
            owner.hand.push(card)
        },
        [Event.MoveCardFromArchiveToHand]: () => {
            const owner: Player = getCardOwner(action.cardID, state)
            const card = getCardInArchiveByID(owner, action.cardID)
            if (!card)
                throw new Error(`Card ${action.cardID} not found in archive`)
            owner.archivePile = owner.archivePile.filter((c: CardInHand) => c !== card)
            owner.hand.push(card)
        },
        [Event.PurgeCard]: () => {
            const owner: Player = getCardOwner(action.cardID, state)
            discardCreatureUpgrades(owner, action.cardID)
            discardCardsUnderneath(owner, action.cardID)
            const card = removeCardByID(owner, action.cardID)
            owner.purgePile.push(card)
        },
        [Event.ArchiveCard]: () => {
            const owner: Player = getCardOwner(action.cardID, state)
            discardCreatureUpgrades(owner, action.cardID)
            discardCardsUnderneath(owner, action.cardID)
            const card = removeCardByID(owner, action.cardID)
            owner.archivePile.push(card)
        },
        [Event.TakeArchive]: () => {
            const owner: Player = getCardOwner(action.cardID, state)
            owner.archivePile.forEach((card: CardInHand) => {
                owner.hand.push(card)
            })
            owner.archivePile = []
        },
        [Event.DrawCard]: () => {
            const player = getPlayerByName(action.playerName, state)

            if (player.drawPile.length === 0)
                return

            player.hand.push(player.drawPile.shift())
        },
        [Event.DrawFromDiscard]: () => {
            const player = getPlayerByName(action.playerName, state)

            if (player.discardPile.length === 0)
                return

            player.hand.push(player.discardPile.pop())
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
