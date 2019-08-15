import {ceil, shuffle} from "lodash"
import Action from "../../shared/Action"
import { CardInGame } from "../../shared/gamestate/CardInGame"
import { GameState, PlayerState as Player } from "../../shared/gamestate/GameState"
import { InputEvent } from "../InputEvent"
import ArtifactHandlers from "./Artifact"
import CreatureHandlers from "./Creature"
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
import PlayActionEvent from  "../GameEvents/PlayActionEvent"

export const exec = async (action: Action, state: GameState) => {

    const actionHandlers: { [key: string]: Function } = {
        [InputEvent.PlayAction]: async () => {
            const owner = getCardOwner(action.cardId!, state)
            const card = getCardInHandById(owner, action.cardId)

            const event = new PlayActionEvent(state, card!)
            await event.perform()
        },
        [InputEvent.PlayUpgrade]: () => {
            const owner: Player = getCardOwner(action.upgradeId!, state)
            const upgrade = getCardInHandById(owner, action.upgradeId)
            const creature = getCreatureById(owner, action.creatureId)
            creature!.upgrades.push(upgrade!)
            removeCardFromHand(owner, action.upgradeId)
        },
        [InputEvent.ShuffleDeck]: () => {
            const player = getPlayerById(action.player!.id, state)
            player.library = shuffle(player.library)
        },
        [InputEvent.ShuffleDiscardIntoDeck]: () => {
            const player = getPlayerById(action.player!.id, state)
            player.discard.forEach((card: CardInGame) => player.library.push(card))
            player.discard = []
            player.library = shuffle(player.library)
        },
        [InputEvent.DiscardCard]: () => {
            // We allow players to place their cards
            // in their own discard or their opponents.
            // Attachments go to the card owner for simplicity's sake.
            const player = getPlayerById(action.player!.id, state)
            const owner: Player = getCardOwner(action.cardId!, state)
            discardCreatureUpgrades(owner, action.cardId)
            discardCardsUnderneath(owner, action.cardId)
            const card = removeCardById(state, action.cardId!)
            player.discard.push(card)
        },
        [InputEvent.PutCardOnDrawPile]: () => {
            const owner: Player = getCardOwner(action.cardId!, state)
            discardCreatureUpgrades(owner, action.cardId)
            discardCardsUnderneath(owner, action.cardId)
            const card = removeCardById(state, action.cardId!)
            owner.library.unshift(card)
        },
        [InputEvent.MoveCardFromDiscardToHand]: () => {
            const owner: Player = getCardOwner(action.cardId!, state)
            const card = getCardInDiscardById(owner, action.cardId!)
            if (!card)
                throw new Error(`Card ${action.cardId} not found in discard`)
            owner.discard = owner.discard.filter((c: CardInGame) => c !== card)
            owner.hand.push(card)
        },
        [InputEvent.MoveCardFromDrawPileToHand]: () => {
            const owner: Player = getCardOwner(action.cardId!, state)
            const card = getCardInDrawPileById(owner, action.cardId!)
            if (!card)
                throw new Error(`Card ${action.cardId} not found in draw pile`)
            owner.library = owner.library.filter((c: CardInGame) => c !== card)
            owner.hand.push(card)
        },
        [InputEvent.MoveCardFromArchiveToHand]: () => {
            const owner: Player = getCardOwner(action.cardId!, state)
            const card = getCardInArchiveById(owner, action.cardId!)
            if (!card)
                throw new Error(`Card ${action.cardId} not found in archive`)
            owner.archives = owner.archives.filter((c: CardInGame) => c !== card)
            owner.hand.push(card)
        },
        [InputEvent.PurgeCard]: () => {
            const owner: Player = getCardOwner(action.cardId!, state)
            discardCreatureUpgrades(owner, action.cardId)
            discardCardsUnderneath(owner, action.cardId)
            const card = removeCardById(state, action.cardId!)
            owner.purged.push(card)
        },
        [InputEvent.ArchiveCard]: () => {
            const owner: Player = getCardOwner(action.cardId!, state)
            discardCreatureUpgrades(owner, action.cardId)
            discardCardsUnderneath(owner, action.cardId)
            const card = removeCardById(state, action.cardId!)
            owner.archives.push(card)
        },
        [InputEvent.TakeArchive]: () => {
            const player = getPlayerById(action.player!.id, state)
            player.archives.forEach((card: CardInGame) => {
                player.hand.push(card)
            })
            player.archives = []
        },
        [InputEvent.DrawCard]: () => {
            const player = getPlayerById(action.player!.id, state)

            if (player.library.length === 0)
                return

            player.hand.push(player.library.shift()!)
        },
        [InputEvent.DrawFromDiscard]: () => {
            const player = getPlayerById(action.player!.id, state)

            if (player.discard.length === 0)
                return

            player.hand.push(player.discard.pop()!)
        },
        [InputEvent.AddAmberToCard]: () => {
            const owner: Player = getCardOwner(action.cardId!, state)
            const cardType = getCardType(state, action.cardId!)
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
        [InputEvent.AlterPlayerChains]: () => {
            const player = getPlayerById(action.player!.id, state)
            player.chains += action.amount!
            player.chains = Math.max(player.chains, 0)
            player.handSize = 6 - ceil(player.chains / 6)
        },
        [InputEvent.AlterPlayerAmber]: () => {
            const player = getPlayerById(action.player!.id, state)
            player.amber += action.amount!
            player.amber = Math.max(player.amber, 0)
        },
        [InputEvent.ForgeKey]: () => {
            const player = getPlayerById(action.player!.id, state)
            if (player.keys < 3)
                player.keys += 1
        },
        [InputEvent.UnForgeKey]: () => {
            const player = getPlayerById(action.player!.id, state)
            if (player.keys > 0)
                player.keys -= 1
        },
    }

    Object.assign(actionHandlers, CreatureHandlers)
    Object.assign(actionHandlers, ArtifactHandlers)

    // Add placeholder function for unimplemented events
    Object.keys(InputEvent)
        .forEach(event => {
            if (!actionHandlers[event])
                actionHandlers[event] = () => {
                }
        })

    const fn = actionHandlers[action.type]
    await fn(action, state)
}
