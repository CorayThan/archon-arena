import { Event } from "../Event"
import { log } from "../../Utils"
import {
    getCardOwner,
    getPlayerByName,
    getCreatureByID,
    getArtifactByID,
    getCardInHandByID,
    removeCreature,
    removeArtifact,
    removeCardFromHand
} from "../StateUtils"
import Creature from "../types/Creature"
import Artifact from "../types/Artifact"
import CardInHand from "../types/CardInHand"

export default {
    [Event.PlayCreature]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardID, state)
        const card = getCardInHandByID(owner, action.cardID)
        if (!card)
            throw new Error(`Card ${action.cardID} not found in hand`)

        const creature: Creature = {
            name: card.name,
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
            }
        }

        const player = getPlayerByName(action.playerName, state)
        if (action.side === "left") {
            player.creatures.unshift(creature)
        } else {
            player.creatures.push(creature)
        }

        removeCardFromHand(owner, action.cardID)
    },
    [Event.MoveCreatureToHand]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardID, state)
        const creature = getCreatureByID(owner, action.cardID)
        if (!creature)
            throw new Error(`Card ${action.cardID} not found in hand`)

        const card: CardInHand = {
            id: creature.id,
            name: creature.name,
        }
        owner.hand.push(card)
        removeCreature(owner, action.cardID)
    },
    [Event.MoveCreatureRight]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardID, state)
        const creature = getCreatureByID(owner, action.cardID)
        if (!creature)
            throw new Error(`Card ${action.cardID} not found in hand`)
        const indexOfCreature = owner.creatures.indexOf(creature)
        if (indexOfCreature === owner.creatures.length - 1)
            return

        const creatureOnRight = owner.creatures[indexOfCreature + 1]
        owner.creatures[indexOfCreature] = creatureOnRight
        owner.creatures[indexOfCreature + 1] = creature
    },
    [Event.MoveCreatureLeft]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardID, state)
        const creature = getCreatureByID(owner, action.cardID)
        if (!creature)
            throw new Error(`Card ${action.cardID} not found in hand`)
        const indexOfCreature = owner.creatures.indexOf(creature)
        if (indexOfCreature === 0)
            return

        const creatureOnLeft = owner.creatures[indexOfCreature - 1]
        owner.creatures[indexOfCreature] = creatureOnLeft
        owner.creatures[indexOfCreature - 1] = creature
    },
    [Event.AlterCreatureDamage]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardID, state)
        const creature = getCreatureByID(owner, action.cardID)
        if (!creature)
            throw new Error(`Card ${action.cardID} not found in hand`)
        creature.tokens.damage += action.amount
    },
    [Event.CaptureAmber]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardID, state)
        const opponent = state.players[0] === owner ? state.players[1] : state.players[0]
        const creature = getCreatureByID(owner, action.cardID)
        if (!creature)
            throw new Error(`Card ${action.cardID} not found in hand`)

        if ((action.amount > 0 && opponent.amber > 0) || (action.amount < 0 && creature.tokens.amber > 0)) {
            creature.tokens.amber += action.amount
            opponent.amber -= action.amount
        }
    },
    [Event.AlterCreaturePower]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardID, state)
        const creature = getCreatureByID(owner, action.cardID)
        if (!creature)
            throw new Error(`Card ${action.cardID} not found in hand`)
        creature.tokens.power += action.amount
    },
    [Event.ToggleStun]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardID, state)
        const creature = getCreatureByID(owner, action.cardID)
        if (!creature)
            throw new Error(`Card ${action.cardID} not found in hand`)
        creature.tokens.stun = creature.tokens.stun === 0 ? 1 : 0
    },
    [Event.ToggleDoomToken]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardID, state)
        const creature = getCreatureByID(owner, action.cardID)
        if (!creature)
            throw new Error(`Card ${action.cardID} not found in hand`)
        creature.tokens.doom = creature.tokens.doom === 0 ? 1 : 0
    },
    [Event.ToggleTaunt]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardID, state)
        const creature = getCreatureByID(owner, action.cardID)
        if (!creature)
            throw new Error(`Card ${action.cardID} not found in hand`)
        creature.taunt = !creature.taunt
    },
    [Event.UseCreature]: (action: any, state: any) => {
        const owner = getCardOwner(action.cardID, state)
        const creature = getCreatureByID(owner, action.cardID)
        if (!creature)
            throw new Error(`Card ${action.cardID} not found in hand`)
        if (creature.ready && creature.tokens.stun) {
            creature.tokens.stun = 0
        }
        creature.ready = !creature.ready
    },
}
