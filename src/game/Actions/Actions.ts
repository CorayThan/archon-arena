import { shuffle } from "lodash"
import Action from "../../shared/Action"
import { CardNotInPlay } from "../../shared/gamestate/CardNotInPlay"
import { GameState, PlayerState as Player } from "../../shared/gamestate/GameState"
import { AEvent } from "../AEvent"
import {
    discardCardsUnderneath,
    discardCreatureUpgrades,
    getArtifactById,
    getCardInArchiveById,
    getCardInDiscardById,
    getCardInDrawPileById,
    getCardInHandById,
    getCardOwner,
    getCardType,
    getCreatureById,
    getPlayerById,
    removeCardById,
    removeCardFromHand,
} from "../StateUtils"
import ArtifactActions from "./Artifact"

import CreatureActions from "./Creature"

export const exec = (action: Action, state: GameState) => {

    const actionHandlers: { [key: string]: Function } = {
        [AEvent.PlayUpgrade]: () => {
            const owner: Player = getCardOwner(action.upgradeId!, state)
            const upgrade = getCardInHandById(owner, action.upgradeId)
            if (!upgrade)
                throw new Error(`Card ${action.upgradeId} not found in hand`)
            const creature = getCreatureById(owner, action.creatureId)
            if (!creature)
                throw new Error(`Card ${action.creatureId} not found in field`)
            creature.upgrades.push(upgrade)
            removeCardFromHand(owner, action.upgradeId)
        },
        [AEvent.PlayAction]: () => {
            const owner: Player = getCardOwner(action.cardId!, state)
            const card = getCardInHandById(owner, action.cardId)
            if (!card)
                throw new Error(`Card ${action.cardId} not found in hand`)
            removeCardFromHand(owner, action.cardId)
            owner.discard.push(card)
        },
        [AEvent.ShuffleDeck]: () => {
            const player = getPlayerById(action.player!.id, state)
            player.library = shuffle(player.library)
        },
        [AEvent.ShuffleDiscardIntoDeck]: () => {
            const player = getPlayerById(action.player!.id, state)
            player.discard.forEach((card: CardNotInPlay) => player.library.push(card))
            player.discard = []
            player.library = shuffle(player.library)
        },
        [AEvent.DiscardCard]: () => {
            const owner: Player = getCardOwner(action.cardId!, state)
            discardCreatureUpgrades(owner, action.cardId)
            discardCardsUnderneath(owner, action.cardId)
            const card = removeCardById(owner, action.cardId!)
            owner.discard.push(card)
        },
        [AEvent.PutCardOnDrawPile]: () => {
            const owner: Player = getCardOwner(action.cardId!, state)
            discardCreatureUpgrades(owner, action.cardId)
            discardCardsUnderneath(owner, action.cardId)
            const card = removeCardById(owner, action.cardId!)
            owner.library.unshift(card)
        },
        [AEvent.MoveCardFromDiscardToHand]: () => {
            const owner: Player = getCardOwner(action.cardId!, state)
            const card = getCardInDiscardById(owner, action.cardId!)
            if (!card)
                throw new Error(`Card ${action.cardId} not found in discard`)
            owner.discard = owner.discard.filter((c: CardNotInPlay) => c !== card)
            owner.hand.push(card)
        },
        [AEvent.MoveCardFromDrawPileToHand]: () => {
            const owner: Player = getCardOwner(action.cardId!, state)
            const card = getCardInDrawPileById(owner, action.cardId!)
            if (!card)
                throw new Error(`Card ${action.cardId} not found in draw pile`)
            owner.library = owner.library.filter((c: CardNotInPlay) => c !== card)
            owner.hand.push(card)
        },
        [AEvent.MoveCardFromArchiveToHand]: () => {
            const owner: Player = getCardOwner(action.cardId!, state)
            const card = getCardInArchiveById(owner, action.cardId!)
            if (!card)
                throw new Error(`Card ${action.cardId} not found in archive`)
            owner.archives = owner.archives.filter((c: CardNotInPlay) => c !== card)
            owner.hand.push(card)
        },
        [AEvent.PurgeCard]: () => {
            const owner: Player = getCardOwner(action.cardId!, state)
            discardCreatureUpgrades(owner, action.cardId)
            discardCardsUnderneath(owner, action.cardId)
            const card = removeCardById(owner, action.cardId!)
            owner.purged.push(card)
        },
        [AEvent.ArchiveCard]: () => {
            const owner: Player = getCardOwner(action.cardId!, state)
            discardCreatureUpgrades(owner, action.cardId)
            discardCardsUnderneath(owner, action.cardId)
            const card = removeCardById(owner, action.cardId!)
            owner.archives.push(card)
        },
        [AEvent.TakeArchive]: () => {
            const player = getPlayerById(action.player!.id, state)
            player.archives.forEach((card: CardNotInPlay) => {
                player.hand.push(card)
            })
            player.archives = []
        },
        [AEvent.DrawCard]: () => {
            const player = getPlayerById(action.player!.id, state)

            if (player.library.length === 0)
                return

            player.hand.push(player.library.shift()!)
        },
        [AEvent.DrawFromDiscard]: () => {
            const player = getPlayerById(action.player!.id, state)

            if (player.discard.length === 0)
                return

            player.hand.push(player.discard.pop()!)
        },
        [AEvent.AddAmberToCard]: () => {
            const owner: Player = getCardOwner(action.cardId!, state)
            const cardType = getCardType(action.cardId!)
            if (cardType === "creature") {
                const creature = getCreatureById(owner, action.cardId)
                if (!creature)
                    throw new Error(`Card ${action.cardId} not found`)
                creature.tokens.amber += action.amount!
                creature.tokens.amber = Math.max(creature.tokens.amber, 0)
            } else if (cardType === "artifact") {
                const artifact = getArtifactById(owner, action.cardId)
                if (!artifact)
                    throw new Error(`Card ${action.cardId} not found`)
                artifact.tokens.amber += action.amount!
                artifact.tokens.amber = Math.max(artifact.tokens.amber, 0)
            }
        },
        [AEvent.AlterPlayerChains]: () => {
            const player = getPlayerById(action.player!.id, state)
            player.chains += action.amount!
            player.chains = Math.max(player.chains, 0)
        },
        [AEvent.AlterPlayerAmber]: () => {
            const player = getPlayerById(action.player!.id, state)
            player.amber += action.amount!
            player.amber = Math.max(player.amber, 0)
        },
        [AEvent.ForgeKey]: () => {
            const player = getPlayerById(action.player!.id, state)
            if (player.keys < 3)
                player.keys += 1
        },
        [AEvent.UnForgeKey]: () => {
            const player = getPlayerById(action.player!.id, state)
            if (player.keys > 0)
                player.keys -= 1
        },
    }

    Object.assign(actionHandlers, CreatureActions)
    Object.assign(actionHandlers, ArtifactActions)

    // Add placeholder function for unimplemented events
    Object.keys(AEvent)
        .forEach(event => {
            if (!actionHandlers[event])
                actionHandlers[event] = () => {
                }
        })

    actionHandlers[action.type](action, state)
}
