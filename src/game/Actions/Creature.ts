import Action from "../../shared/Action"
import { CardNotInPlay } from "../../shared/gamestate/CardNotInPlay"
import { Creature } from "../../shared/gamestate/Creature"
import { GameState } from "../../shared/gamestate/GameState"
import { AEvent } from "../AEvent"
import { getCardInHandById, getCardOwner, getCreatureById, getPlayerById, removeCardFromHand, removeCreature } from "../StateUtils"

export default {
    [AEvent.PlayCreature]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const card = getCardInHandById(owner, action.cardId)
        if (!card)
            throw new Error(`Card ${action.cardId} not found in hand`)

        const creature: Creature = {
            id: card.id,
            ready: false,
            faceup: true,
            taunt: false,
            upgrades: [],
            cardsUnderneath: [],
            tokens: {
                armor: 0,
                power: 0,
                damage: 0,
                amber: 0,
                stun: 0,
                doom: 0
            },
            ownerId: owner.player.id,
            backingCard: card.backingCard,
        }

        const player = getPlayerById(action.player!.id, state)
        if (action.side === "left") {
            player.creatures.unshift(creature)
        } else {
            player.creatures.push(creature)
        }

        removeCardFromHand(owner, action.cardId)
    },
    [AEvent.MoveCreatureToHand]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)

        const card: CardNotInPlay = {
            id: creature.id,
            ownerId: owner.player.id,
            backingCard: creature.backingCard,
        }
        owner.hand.push(card)
        removeCreature(owner, action.cardId!)
    },
    [AEvent.MoveCreatureRight]: (action: Action, state: GameState) => {
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
    [AEvent.MoveCreatureLeft]: (action: Action, state: GameState) => {
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
    [AEvent.AlterCreatureDamage]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.tokens.damage += action.amount!
    },
    [AEvent.CaptureAmber]: (action: Action, state: GameState) => {
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
    [AEvent.AlterCreaturePower]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.tokens.power += action.amount!
    },
    [AEvent.ToggleStun]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.tokens.stun = creature.tokens.stun === 0 ? 1 : 0
    },
    [AEvent.ToggleDoomToken]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.tokens.doom = creature.tokens.doom === 0 ? 1 : 0
    },
    [AEvent.ToggleTaunt]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.taunt = !creature.taunt
    },
    [AEvent.UseCreature]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        if (creature.ready && creature.tokens.stun) {
            creature.tokens.stun = 0
        }
        creature.ready = !creature.ready
    },
}
