import Action from "../../shared/Action"
import { CardInGame } from "../../shared/gamestate/CardInGame"
import { Creature } from "../../shared/gamestate/Creature"
import { GameState } from "../../shared/gamestate/GameState"
import { InputEvent } from "../InputEvent"
import { getCardInHandById, getCardOwner, getCreatureById, getPlayerById, removeCardFromHand, removeCreature } from "../StateUtils"
import { cardScripts } from "../../card-scripts/CardScripts"
import ReapEvent from "../GameEvents/ReapEvent"
import PlayCreatureEvent from "../GameEvents/PlayCreatureEvent"

export default {
    [InputEvent.PlayCreature]: async (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const card = getCardInHandById(owner, action.cardId)
        if (!card)
            throw new Error(`Card ${action.cardId} not found in hand`)

        const event = new PlayCreatureEvent(state, card)
        await event.perform()
    },
    [InputEvent.MoveCreatureToHand]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)

        const card: CardInGame = {
            id: creature.id,
            ownerId: owner.player.id,
            house: creature.backingCard.house,
            backingCard: creature.backingCard,
        }
        owner.hand.push(card)
        removeCreature(owner, action.cardId!)
    },
    [InputEvent.MoveCreatureRight]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        const indexOfCreature = owner.creatures.indexOf(creature)
        if (indexOfCreature === owner.creatures.length - 1)
            return

        owner.creatures[indexOfCreature] = owner.creatures[indexOfCreature + 1]
        owner.creatures[indexOfCreature + 1] = creature
    },
    [InputEvent.MoveCreatureLeft]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        const indexOfCreature = owner.creatures.indexOf(creature)
        if (indexOfCreature === 0)
            return

        owner.creatures[indexOfCreature] = owner.creatures[indexOfCreature - 1]
        owner.creatures[indexOfCreature - 1] = creature
    },
    [InputEvent.AlterCreatureDamage]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.tokens.damage += action.amount!
    },
    [InputEvent.CaptureAmber]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const opponent = state.playerOneState.player.id === owner.player.id ? state.playerTwoState : state.playerOneState
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)

        if ((action.amount! > 0 && opponent.amber > 0) || (action.amount! < 0 && creature.tokens.amber > 0)) {
            creature.tokens.amber += action.amount!
            opponent.amber -= action.amount!
        }
    },
    [InputEvent.AlterCreaturePower]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.tokens.power += action.amount!
    },
    [InputEvent.ToggleStun]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.tokens.stun = creature.tokens.stun === 0 ? 1 : 0
    },
    [InputEvent.ToggleDoomToken]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.tokens.doom = creature.tokens.doom === 0 ? 1 : 0
    },
    [InputEvent.ToggleTaunt]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.taunt = !creature.taunt
    },
    [InputEvent.UseCreature]: async (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)

        if (creature!.ready && creature!.tokens.stun) {
            creature!.tokens.stun = 0
            creature!.ready = false
            return
        }

        if (!creature!.ready) {
            creature!.ready = true
            return
        }

        const event = new ReapEvent(state, creature!)
        await event.perform()
    },
}
