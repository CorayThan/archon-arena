import { Event } from "../Event"
import { log } from "../../Utils"
import {
    getCardOwner,
    getPlayerByName,
    getCreatureById,
    getArtifactById,
    getCardInHandById,
    removeCreature,
    removeArtifact,
    removeCardFromHand
} from "../StateUtils"
import { Creature } from "../../shared/gamestate/Creature"
import { Artifact } from "../../shared/gamestate/Artifact"
import { CardNotInPlay } from "../../shared/gamestate/CardNotInPlay"

export default {
    [Event.PlayCreature]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardId, state)
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
            ownerId: owner.playerId,
            backingCard: card.backingCard,
        }

        const player = getPlayerByName(action.playerName, state)
        if (action.side === "left") {
            player.creatures.unshift(creature)
        } else {
            player.creatures.push(creature)
        }

        removeCardFromHand(owner, action.cardId)
    },
    [Event.MoveCreatureToHand]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardId, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)

        const card: CardNotInPlay = {
            id: creature.id,
            ownerId: owner.playerId,
            backingCard: creature.backingCard,
        }
        owner.hand.push(card)
        removeCreature(owner, action.cardId)
    },
    [Event.MoveCreatureRight]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardId, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        const indexOfCreature = owner.creatures.indexOf(creature)
        if (indexOfCreature === owner.creatures.length - 1)
            return

        const creatureOnRight = owner.creatures[indexOfCreature + 1]
        owner.creatures[indexOfCreature] = creatureOnRight
        owner.creatures[indexOfCreature + 1] = creature
    },
    [Event.MoveCreatureLeft]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardId, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        const indexOfCreature = owner.creatures.indexOf(creature)
        if (indexOfCreature === 0)
            return

        const creatureOnLeft = owner.creatures[indexOfCreature - 1]
        owner.creatures[indexOfCreature] = creatureOnLeft
        owner.creatures[indexOfCreature - 1] = creature
    },
    [Event.AlterCreatureDamage]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardId, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.tokens.damage += action.amount
    },
    [Event.CaptureAmber]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardId, state)
        const opponent = state.playerOneState.playerId === owner.playerId ? state.playerTwoState : state.playerOneState
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)

        if ((action.amount > 0 && opponent.amber > 0) || (action.amount < 0 && creature.tokens.amber > 0)) {
            creature.tokens.amber += action.amount
            opponent.amber -= action.amount
        }
    },
    [Event.AlterCreaturePower]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardId, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.tokens.power += action.amount
    },
    [Event.ToggleStun]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardId, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.tokens.stun = creature.tokens.stun === 0 ? 1 : 0
    },
    [Event.ToggleDoomToken]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardId, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.tokens.doom = creature.tokens.doom === 0 ? 1 : 0
    },
    [Event.ToggleTaunt]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardId, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.taunt = !creature.taunt
    },
    [Event.UseCreature]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardId, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        if (creature.ready && creature.tokens.stun) {
            creature.tokens.stun = 0
        }
        creature.ready = !creature.ready
    },
}
