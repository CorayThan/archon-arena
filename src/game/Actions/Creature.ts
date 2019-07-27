import Action from "../../shared/Action"
import { CardInGame } from "../../shared/gamestate/CardInGame"
import { Creature } from "../../shared/gamestate/Creature"
import { GameState } from "../../shared/gamestate/GameState"
import { GameEvent } from "../GameEvent"
import { getCardInHandById, getCardOwner, getCreatureById, getPlayerById, removeCardFromHand, removeCreature } from "../StateUtils"
import { cardScripts } from "../../card-scripts/CardScripts"

export default {
    [GameEvent.PlayCreature]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const card = getCardInHandById(owner, action.cardId)
        if (!card)
            throw new Error(`Card ${action.cardId} not found in hand`)

        const cardScript = cardScripts.scripts.get(card!.backingCard.cardTitle.replace(/ /g, "-").toLowerCase())
        if (cardScript) {
            if (cardScript.amber) {
                owner.amber += cardScript.amber(state, { thisCard: card })
            }
            if (cardScript.onPlay && cardScript.onPlay.perform) {
                cardScript.onPlay.perform(state, { thisCard: card })
            }
        }

        const creature: Creature = {
            id: card.id,
            ready: false,
            faceup: true,
            taunt: false,
            elusive: false,
            deploy: false,
            poison: false,
            skirmish: false,
            assault: 0,
            hazardous: 0,
            armor: 0,
            upgrades: [],
            cardsUnderneath: [],
            tokens: {
                armor: 0,
                power: 0,
                damage: 0,
                amber: 0,
                stun: 0,
                skirmish: 0,
                elusive: 0,
                doom: 0
            },
            power: card.backingCard.power,
            traits: card.backingCard.traits,
            house: card.backingCard.house,
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
    [GameEvent.MoveCreatureToHand]: (action: Action, state: GameState) => {
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
    [GameEvent.MoveCreatureRight]: (action: Action, state: GameState) => {
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
    [GameEvent.MoveCreatureLeft]: (action: Action, state: GameState) => {
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
    [GameEvent.AlterCreatureDamage]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.tokens.damage += action.amount!
    },
    [GameEvent.CaptureAmber]: (action: Action, state: GameState) => {
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
    [GameEvent.AlterCreaturePower]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.tokens.power += action.amount!
    },
    [GameEvent.ToggleStun]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.tokens.stun = creature.tokens.stun === 0 ? 1 : 0
    },
    [GameEvent.ToggleDoomToken]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.tokens.doom = creature.tokens.doom === 0 ? 1 : 0
    },
    [GameEvent.ToggleTaunt]: (action: Action, state: GameState) => {
        const owner = getCardOwner(action.cardId!, state)
        const creature = getCreatureById(owner, action.cardId)
        if (!creature)
            throw new Error(`Card ${action.cardId} not found in hand`)
        creature.taunt = !creature.taunt
    },
    [GameEvent.UseCreature]: (action: Action, state: GameState) => {
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
