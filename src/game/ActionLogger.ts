import Action from "../shared/Action"
import { GameState } from "../shared/gamestate/GameState"
import { GameEvent } from "./GameEvent"
import { getArtifactById, getCreatureById, getCardInHandById, getCardById, getCardOwner, getCardInDiscardById, getCardInDrawPileById, getCardInArchiveById, getPlayerById } from "./StateUtils"

export const buildLogForAction = (action: Action, state: GameState): Action | undefined => {

    const events: { [key: string]: Function } = {
        [GameEvent.PlayUpgrade]: () => {
            const owner = getCardOwner(action.upgradeId!, state)
            const upgrade = getCardInHandById(owner, action.upgradeId)
            const creature = getCreatureById(owner, action.creatureId)
            action.message = `${owner.player.name} attaches ${upgrade!.backingCard.cardTitle} to ${creature!.backingCard.cardTitle}`
            return action
        },
        [GameEvent.PlayAction]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const card = getCardInHandById(owner, action.cardId)
            action.message = `${owner.player.name} plays ${card!.backingCard.cardTitle}`
            return action
        },
        [GameEvent.ShuffleDeck]: () => {
            const player = getPlayerById(action.player!.id, state)
            action.message = `${player.player.name} shuffles their deck`
            return action
        },
        [GameEvent.ShuffleDiscardIntoDeck]: () => {
            const player = getPlayerById(action.player!.id, state)
            action.message = `${player.player.name} shuffles their discard pile into their deck`
            return action
        },
        [GameEvent.DiscardCard]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const card = getCardById(owner, action.cardId!)
            action.message = `${owner.player.name} discards ${card!.backingCard.cardTitle}`
            return action
        },
        [GameEvent.PutCardOnDrawPile]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const card = getCardInHandById(owner, action.cardId!)
            action.message = `${owner.player.name} puts ${card!.backingCard.cardTitle} on top of their library`
            return action
        },
        [GameEvent.MoveCardFromDiscardToHand]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const card = getCardInDiscardById(owner, action.cardId!)
            action.message = `${owner.player.name} takes ${card!.backingCard.cardTitle} from their discard pile`
            return action
        },
        [GameEvent.MoveCardFromDrawPileToHand]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const card = getCardInDrawPileById(owner, action.cardId!)
            action.message = `${owner.player.name} takes ${card!.backingCard.cardTitle} from their library`
            return action
        },
        [GameEvent.MoveCardFromArchiveToHand]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const card = getCardInArchiveById(owner, action.cardId!)
            action.message = `${owner.player.name} takes ${card!.backingCard.cardTitle} on top of their archive`
            return action
        },
        [GameEvent.PurgeCard]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const card = getCardInHandById(owner, action.cardId!)
            action.message = `${owner.player.name} purges ${card!.backingCard.cardTitle}`
            return action
        },
        [GameEvent.ArchiveCard]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const card = getCardById(owner, action.cardId!)
            action.message = `${owner.player.name} archives ${card!.backingCard.cardTitle}`
            return action
        },
        [GameEvent.TakeArchive]: () => {
            const player = getPlayerById(action.player!.id, state)
            action.message = `${player.player.name} takes their archives`
            return action
        },
        [GameEvent.DrawCard]: () => {
            const player = getPlayerById(action.player!.id, state)
            action.message = `${player.player.name} draws a card`
            return action
        },
        [GameEvent.DrawFromDiscard]: () => {
            const player = getPlayerById(action.player!.id, state)

            if (player.discard.length === 0)
                return

            const card = player.discard[player.discard.length - 1]
            action.message = `${player.player.name} takes ${card!.backingCard.cardTitle} from their discard pile`
            return action
        },
        [GameEvent.AddAmberToCard]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const card = getCardById(owner, action.cardId!)
            if (action.amount! > 0)
                action.message = `${owner.player.name} gains ${action.amount} æmber`
            else
                action.message = `${owner.player.name} removes ${Math.abs(action.amount!)} æmber`
        },
        [GameEvent.AlterPlayerChains]: () => {
            const player = getPlayerById(action.player!.id, state)
            if (action.amount! > 0)
                action.message = `${player.player.name} gains ${action.amount} chain`
            else
                action.message = `${player.player.name} sheds ${Math.abs(action.amount!)} chain`
            return action
        },
        [GameEvent.AlterPlayerAmber]: () => {
            const player = getPlayerById(action.player!.id, state)
            if (action.amount! > 0)
                action.message = `${player.player.name} gains ${action.amount} æmber`
            else
                action.message = `${player.player.name} removes ${Math.abs(action.amount!)} æmber`
            return action
        },
        [GameEvent.ForgeKey]: () => {
            const player = getPlayerById(action.player!.id, state)
            action.message = `${player.player.name} forges a key`
            return action
        },
        [GameEvent.UnForgeKey]: () => {
            const player = getPlayerById(action.player!.id, state)
            action.message = `${player.player.name} unforges a key`
            return action
        },
        [GameEvent.PlayCreature]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const creature = getCardInHandById(owner, action.cardId!)
            if (owner.creatures.length === 0)
                action.message = `${owner.player.name} plays ${creature!.backingCard.cardTitle}`
            else
                action.message = `${owner.player.name} plays ${creature!.backingCard.cardTitle} on ${action.side} the flank`
            return action
        },
        [GameEvent.MoveCreatureToHand]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const creature = getCreatureById(owner, action.cardId)
            action.message = `A player moves ${creature!.backingCard.cardTitle} to ${owner.player.name}'s hand`
            return action
        },
        [GameEvent.MoveCreatureRight]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const creature = getCreatureById(owner, action.cardId)
            action.message = `${owner.player.name} moves ${creature!.backingCard.cardTitle} right`
            return action
        },
        [GameEvent.MoveCreatureLeft]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const creature = getCreatureById(owner, action.cardId)
            action.message = `${owner.player.name} moves ${creature!.backingCard.cardTitle} left`
            return action
        },
        [GameEvent.AlterCreatureDamage]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const creature = getCreatureById(owner, action.cardId)
            if (action.amount! > 0)
                action.message = `${owner.player.name} adds ${action.amount} damage to ${creature!.backingCard.cardTitle}`
            else
                action.message = `${owner.player.name} removes ${Math.abs(action.amount!)} damage to ${creature!.backingCard.cardTitle}`
            return action
        },
        [GameEvent.CaptureAmber]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const creature = getCreatureById(owner, action.cardId)
            if (action.amount! > 0)
                action.message = `${owner.player.name} makes ${creature!.backingCard.cardTitle} capture ${action.amount} æmber`
            else
                action.message = `${owner.player.name} makes ${creature!.backingCard.cardTitle} return ${Math.abs(action.amount!)} captured æmber`
            return action
        },
        [GameEvent.AlterCreaturePower]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const creature = getCreatureById(owner, action.cardId)
            if (action.amount! > 0)
                action.message = `${owner.player.name} adds ${action.amount} power to ${creature!.backingCard.cardTitle}`
            else
                action.message = `${owner.player.name} removes ${Math.abs(action.amount!)} power to ${creature!.backingCard.cardTitle}`
            return action
        },
        [GameEvent.ToggleStun]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const creature = getCreatureById(owner, action.cardId)
            if (creature!.tokens.stun > 0)
                action.message = `${owner.player.name} stuns ${creature!.backingCard.cardTitle}`
            else
                action.message = `${owner.player.name} unstuns ${creature!.backingCard.cardTitle}`
            return action
        },
        [GameEvent.ToggleDoomToken]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const creature = getCreatureById(owner, action.cardId)
            if (creature!.tokens.doom > 0)
                action.message = `${owner.player.name} adds a doom token to ${creature!.backingCard.cardTitle}`
            else
                action.message = `${owner.player.name} removes a doom token from ${creature!.backingCard.cardTitle}`
            return action
        },
        [GameEvent.ToggleTaunt]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const creature = getCreatureById(owner, action.cardId)
            if (creature!.taunt)
                action.message = `${owner.player.name} adds taunt to ${creature!.backingCard.cardTitle}`
            else
                action.message = `${owner.player.name} removes taunt from ${creature!.backingCard.cardTitle}`
            return action
        },
        [GameEvent.UseCreature]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const creature = getCreatureById(owner, action.cardId)
            if (creature!.ready)
                action.message = `${owner.player.name} exhausts ${creature!.backingCard.cardTitle}`
            else
                action.message = `${owner.player.name} readies ${creature!.backingCard.cardTitle}`
            return action
            return action
        },
        [GameEvent.PlayArtifact]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const artifact = getCardInHandById(owner, action.cardId!)
            action.message = `${owner.player.name} plays ${artifact!.backingCard.cardTitle}`
            return action
        },
        [GameEvent.UseArtifact]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const artifact = getArtifactById(owner, action.cardId)
            if (artifact!.ready)
                action.message = `${owner.player.name} exhausts ${artifact!.backingCard.cardTitle}`
            else
                action.message = `${owner.player.name} readies ${artifact!.backingCard.cardTitle}`
            return action
        },
        [GameEvent.MoveArtifactToHand]: () => {
            const owner = getCardOwner(action.cardId!, state)
            const artifact = getArtifactById(owner, action.cardId)
            action.message = `A player moves ${artifact!.backingCard.cardTitle} to ${owner.player.name}'s hand`
            return action
        },
    }

    // Add placeholder function for unimplemented events
    Object.keys(GameEvent)
        .forEach(event => {
            if (!events[event])
                events[event] = () => {}
        })

    action.message = `${action.type} has no message`

    // @ts-ignore
    return events[action.type]()
}

