import { shuffle } from "lodash"
import { Event } from "../Event"
import {
    discardCreatureUpgrades,
    discardCardsUnderneath,
    getArtifactById,
    getCardOwner,
    getCardById,
    getCardType,
    getCreatureById,
    getCardInHandById,
    getCardInDiscardById,
    getCardInDrawPileById,
    getCardInArchiveById,
    getPlayerByName,
    removeCreature,
    removeArtifact,
    removeUpgrade,
    removeCardFromHand,
    removeCardById,
} from "../StateUtils"

//import Action from "../types/Action"
import { PlayerState as Player } from "../../shared/gamestate/GameState"
import { Creature } from "../../shared/gamestate/Creature"
import { Artifact } from "../../shared/gamestate/Artifact"
import { CardNotInPlay } from "../../shared/gamestate/CardNotInPlay"

import CreatureActions from "./Creature"
import ArtifactActions from "./Artifact"

export const exec = (action: any, state: any) => {

    const actionHandlers: { [key: string]: Function } = {
        [Event.PlayUpgrade]: () => {
            const owner: Player = getCardOwner(action.upgradeId, state)
            const upgrade = getCardInHandById(owner, action.upgradeId)
            if (!upgrade)
                throw new Error(`Card ${action.upgradeId} not found in hand`)
            const creature = getCreatureById(owner, action.creatureId)
            if (!creature)
                throw new Error(`Card ${action.creatureId} not found in field`)
            creature.upgrades.push(upgrade)
            removeCardFromHand(owner, action.upgradeId)
        },
        [Event.PlayAction]: () => {
            const owner: Player = getCardOwner(action.cardId, state)
            const card = getCardInHandById(owner, action.cardId)
            if (!card)
                throw new Error(`Card ${action.cardId} not found in hand`)
            removeCardFromHand(owner, action.cardId)
            owner.discard.push(card)
        },
        [Event.ShuffleDeck]: () => {
            const player = getPlayerByName(action.playerName, state)
            player.library = shuffle(player.library)
        },
        [Event.ShuffleDiscardIntoDeck]: () => {
            const player = getPlayerByName(action.playerName, state)
            player.discard.forEach((card: CardNotInPlay) => player.library.push(card))
            player.discard = []
            player.library = shuffle(player.library)
        },
        [Event.DiscardCard]: () => {
            const owner: Player = getCardOwner(action.cardId, state)
            discardCreatureUpgrades(owner, action.cardId)
            discardCardsUnderneath(owner, action.cardId)
            const card = removeCardById(owner, action.cardId)
            owner.discard.push(card)
        },
        [Event.PutCardOnDrawPile]: () => {
            const owner: Player = getCardOwner(action.cardId, state)
            discardCreatureUpgrades(owner, action.cardId)
            discardCardsUnderneath(owner, action.cardId)
            const card = removeCardById(owner, action.cardId)
            owner.library.unshift(card)
        },
        [Event.MoveCardFromDiscardToHand]: () => {
            const owner: Player = getCardOwner(action.cardId, state)
            const card = getCardInDiscardById(owner, action.cardId)
            if (!card)
                throw new Error(`Card ${action.cardId} not found in discard`)
            owner.discard = owner.discard.filter((c: CardNotInPlay) => c !== card)
            owner.hand.push(card)
        },
        [Event.MoveCardFromDrawPileToHand]: () => {
            const owner: Player = getCardOwner(action.cardId, state)
            const card = getCardInDrawPileById(owner, action.cardId)
            if (!card)
                throw new Error(`Card ${action.cardId} not found in draw pile`)
            owner.library = owner.library.filter((c: CardNotInPlay) => c !== card)
            owner.hand.push(card)
        },
        [Event.MoveCardFromArchiveToHand]: () => {
            const owner: Player = getCardOwner(action.cardId, state)
            const card = getCardInArchiveById(owner, action.cardId)
            if (!card)
                throw new Error(`Card ${action.cardId} not found in archive`)
            owner.archives = owner.archives.filter((c: CardNotInPlay) => c !== card)
            owner.hand.push(card)
        },
        [Event.PurgeCard]: () => {
            const owner: Player = getCardOwner(action.cardId, state)
            discardCreatureUpgrades(owner, action.cardId)
            discardCardsUnderneath(owner, action.cardId)
            const card = removeCardById(owner, action.cardId)
            owner.purged.push(card)
        },
        [Event.ArchiveCard]: () => {
            const owner: Player = getCardOwner(action.cardId, state)
            discardCreatureUpgrades(owner, action.cardId)
            discardCardsUnderneath(owner, action.cardId)
            const card = removeCardById(owner, action.cardId)
            owner.archives.push(card)
        },
        [Event.TakeArchive]: () => {
            const owner: Player = getCardOwner(action.cardId, state)
            owner.archives.forEach((card: CardNotInPlay) => {
                owner.hand.push(card)
            })
            owner.archives = []
        },
        [Event.DrawCard]: () => {
            const player = getPlayerByName(action.playerName, state)

            if (player.library.length === 0)
                return

            player.hand.push(player.library.shift())
        },
        [Event.DrawFromDiscard]: () => {
            const player = getPlayerByName(action.playerName, state)

            if (player.discard.length === 0)
                return

            player.hand.push(player.discard.pop())
        },
        [Event.AddAmberToCard]: () => {
            const owner: Player = getCardOwner(action.cardId, state)
            const cardType = getCardType(action.cardId)
            if (cardType === "creature") {
                const creature = getCreatureById(owner, action.cardId)
                if (!creature)
                    throw new Error(`Card ${action.cardId} not found`)
                creature.tokens.amber += action.amount
                creature.tokens.amber = Math.max(creature.tokens.amber, 0)
            } else if (cardType === "artifact") {
                const artifact = getArtifactById(owner, action.cardId)
                if (!artifact)
                    throw new Error(`Card ${action.cardId} not found`)
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
