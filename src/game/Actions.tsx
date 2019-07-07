import { Event } from "./Event"
import { log } from "../Utils"
import {
  getCardOwner,
  getCreatureByID,
  getArtifactByID,
  getCardInHandByID,
  removeCreature,
  removeArtifact,
  removeCardFromHand
} from "./StateUtils"
import Creature from "./types/Creature"
import Artifact from "./types/Artifact"
import CardInHand from "./types/CardInHand"

export const exec = (action: any, state: any) => {

    const events: { [key: string]: Function } = {
        [Event.PlayCreature]: () => {
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
                    stun: 0
                }
            }

            if (action.side === "left") {
                owner.creatures.unshift(creature)
            } else {
                owner.creatures.push(creature)
            }

            removeCardFromHand(owner, action.cardID)
        },
        [Event.DiscardCreature]: () => {
            const owner = getCardOwner(action.cardID, state)
            removeCreature(owner, action.cardID)
        },
        [Event.MoveCreatureToHand]: () => {
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
        [Event.AlterCreatureDamage]: () => {
            const owner = getCardOwner(action.cardID, state)
            const creature = getCreatureByID(owner, action.cardID)
            if (!creature)
                throw new Error(`Card ${action.cardID} not found in hand`)
            creature.tokens.damage += action.amount
        },
        [Event.CaptureAmber]: () => {
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
        [Event.AlterCreaturePower]: () => {
            const owner = getCardOwner(action.cardID, state)
            const creature = getCreatureByID(owner, action.cardID)
            if (!creature)
                throw new Error(`Card ${action.cardID} not found in hand`)
            creature.tokens.power += action.amount
        },
        [Event.ToggleStun]: () => {
            const owner = getCardOwner(action.cardID, state)
            const creature = getCreatureByID(owner, action.cardID)
            if (!creature)
                throw new Error(`Card ${action.cardID} not found in hand`)
            creature.tokens.stun = creature.tokens.stun === 0 ? 1 : 0
        },
        [Event.UseCreature]: () => {
            const owner = getCardOwner(action.cardID, state)
            const creature = getCreatureByID(owner, action.cardID)
            if (!creature)
                throw new Error(`Card ${action.cardID} not found in hand`)

            if (!creature.ready) {
                creature.ready = true
                return
            }

            if (creature.tokens.stun) {
                creature.tokens.stun = 0
                creature.ready = false
            } else {
                const owner = getCardOwner(action.cardID, state)
                owner.amber += 1
                creature.ready = false
            }
        },


        [Event.PlayArtifact]: () => {
            const owner = getCardOwner(action.cardID, state)
            const card = getCardInHandByID(owner, action.cardID)
            if (!card)
                throw new Error(`Card ${action.cardID} not found in hand`)

            const artifact: Artifact = {
                name: card.name,
                id: card.id,
                ready: false,
                faceup: true,
                cardsUnderneath: [],
                tokens: {
                    amber: 0,
                }
            }

            owner.artifacts.push(artifact)
            removeCardFromHand(owner, action.cardID)
        },
        [Event.UseArtifact]: () => {},
        [Event.DiscardArtifact]: () => {
            const owner = getCardOwner(action.cardID, state)
            removeArtifact(owner, action.cardID)
        },
        [Event.MoveArtifactToHand]: () => {
            const owner = getCardOwner(action.cardID, state)
            const artifact = getArtifactByID(owner, action.cardID)
            if (!artifact)
                throw new Error(`Card ${action.cardID} not found in hand`)

            const card: CardInHand = {
                id: artifact.id,
                name: artifact.name,
            }
            owner.hand.push(card)
            removeArtifact(owner, action.cardID)
        },


        [Event.DiscardCard]: () => {
            const owner = getCardOwner(action.cardID, state)
            removeCardFromHand(owner, action.cardID)
        },
        [Event.DrawCard]: () => {},
        [Event.EndTurn]: () => {
            const player = state.players.find((p: any) => p.name === state.activePlayer)
            player.creatures.forEach((c: any) => c.ready = true)
            player.artifacts.forEach((c: any) => c.ready = true)

            const newActivePlayer = state.players[0] === player ? state.players[1].name : state.players[0].name
            state.activePlayer = newActivePlayer
        },
    }

    events[action.type]()
}
