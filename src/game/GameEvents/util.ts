import { cardScripts } from "../../card-scripts/CardScripts"
import { CardScript, Trigger } from "../../card-scripts/types/CardScript"
import { CardInGame } from "../../shared/gamestate/CardInGame"
import { GameState, PlayerState } from "../../shared/gamestate/GameState"
import { Creature } from "../../shared/gamestate/Creature"
import { Artifact } from "../../shared/gamestate/Artifact"
import { EffectType  } from "../../shared/GameEffect"
import {
    isCardOnBoard,
    activePlayerState,
} from "../../card-scripts/ScriptUtils"
import {
    getCardOwner,
    getCardById,
} from "../StateUtils"

const cardToScriptID = (card: CardInGame) => {
    return card.backingCard.cardTitle.replace(/ /g, "-").toLowerCase()
}

export const prepareEffect = (state: GameState, script: CardScript, triggerCard: CardInGame, effectSource: CardInGame, event: Trigger): Function => {

    return async () => {

        if (!script[event])
            return

        const config: {
            thisCard: CardInGame,
            targets: CardInGame[],
            secondaryTargets: CardInGame[],
            triggerCard: CardInGame,
            choices: string[],
            timesExecuted: number,
        } = {
            thisCard: effectSource,
            triggerCard: triggerCard,
            targets: [],
            secondaryTargets: [],
            choices: [],
            timesExecuted: 0,
        }

        if (script[event]!.validTargets) {
            const validTargets = script[event]!.validTargets!(state, config)
            const targetCount = script[event]!.numberOfTargets!(state, config)
            config.targets = await promptForTargets(validTargets, targetCount)
            // needed until promptForTargets is implemented
            config.targets = config.targets.slice(0, targetCount)
        }

        if (script[event]!.selectFromChoices) {
            const choices = script[event]!.selectFromChoices!(state, config)
            config.choices = await promptForChoice(state, "TODO hook up prompt", choices)
        }

        await script[event]!.perform!(state, config)
    }
}

export const getEffectsForEvent = (state: GameState, card: CardInGame, event: Trigger) => {
    const effects: Function[] = []

    const playerStates = [
        state.playerOneState,
        state.playerTwoState,
    ]

    playerStates.forEach((playerState: PlayerState) => {
        playerState.creatures.forEach((creature: Creature) => {
            const script = cardScripts.scripts.get(cardToScriptID(creature))
            if (script && script[event]) {
                const fn = prepareEffect(state, script, card, creature, event)
                effects.push(fn)
            }
        })

        playerState.artifacts.forEach((artifact: Artifact) => {
            const script = cardScripts.scripts.get(cardToScriptID(artifact))
            if (script && script[event]) {
                const fn = prepareEffect(state, script, card, artifact, event)
                effects.push(fn)
            }
        })
    })

    const persistentEffectMap = state.effects || new Map()
    const persistentEffects = persistentEffectMap.get(state.turn) || []
    persistentEffects.forEach((cardId: string) => {
        const script = cardScripts.scripts.get(cardId)
        const owner = getCardOwner(cardId, state)
        const sourceCard = getCardById(owner, cardId)
        if (script && script.effect && script.effect[event]) {
            effects.push(prepareEffect(state, script.effect!, card, sourceCard!, event))
        }
    })

    return effects
}

export const promptForOrderOfEffects = (effects: any) => {
    return effects
}

export const promptForTargets = (targets: any, numTargets: number) => {
    return targets.slice(0, numTargets)
}

export const promptForChoice = (state: GameState, promptMessage: string, choices: any[]) => {
    return choices[0]
}

export const createCreatureFromCard = (card: CardInGame) => {
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
        backingCard: card.backingCard,
        ownerId: card.ownerId,
    }
    return creature
}
