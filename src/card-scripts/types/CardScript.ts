import { AnyCardInGame, CardInGame } from "../../shared/gamestate/CardInGame"
import { GameState } from "../../shared/gamestate/GameState"

export interface CardScript {

    /**
     * Cards like Free Markets require these to be functions
     */
    amber?: CurrentQuantity

    entersPlay?: IndividualScript
    onPlay?: IndividualScript

    /**
     * Softlanding, etc.
     */
    //TODO card that triggers => config.triggerCard
    nextCardPlayed?: IndividualScript

    /**
     * witches, Tunk, etc.
     */
    //TODO card that triggers => config.triggerCard
    cardPlayed?: IndividualScript

    /**
     * Firespitter, etc.
     */
    beforeFight?: IndividualScript

    /**
     * Interdimensional Graft etc
     */
    onNextKeyForge?: IndividualScript

    /**
     * Forgemaster Og
     */
    onKeyForge?: IndividualScript

    /**
     * Dodger, Headhunter, etc.
     */
    fight?: IndividualScript

    /**
     * Greking, Brain Eater, Krump, etc. Check in action log if destroyed.
     */
    onAnyFight?: IndividualScript
    omni?: IndividualScript
    reap?: IndividualScript
    action?: IndividualScript
    destroyed?: IndividualScript
    leavesPlay?: IndividualScript

    /**
     * Reap Haters
     */
    //TODO make the card that does this config.triggerCard
    onAnyReap?: IndividualScript

    /**
     * Tentacus
     */
    //TODO make the card that does this config.triggerCard as CardInGame
    onAnyAction?: IndividualScript

    /**
     * when a card gets discarded, Annihilation Ritual
     */
    //TODO make the card that does this config.triggerCard
    onDiscard?: IndividualScript

    /**
     * when a creature gets destroyed, SoulSnatcher
     */
    //TODO make the card that does this config.triggerCard
    onCreatureDestroyed?: IndividualScript

    /**
     * For Niffle Ape, Groggins
     *
     * Returns card ids of valid attack targets
     */
    validAttackTargets?: (state: GameState) => CardInGame[]

    /**
     * For Kelifi Dragon
     */
    canBePlayed?: IsActive

    /**
     * Like Storm Crawler, Grabos, Lollop (can use game state's current player to determine if attacking or attacked)
     */
    fightingDamageDealt?: CurrentQuantity

    /**
     * For things like Banner of Battle or Iron Obelisk to modify game state before it is passed to a card script or auto game functions (like killing
     * creatures or forging keys) are run.
     */
    staticEffect?: CardScriptExecution

    alpha?: IsActive
    omega?: IsActive
    elusive?: IsActive

    /**
     * Cards like Spyyyder need these to be functions.
     */
    skirmish?: IsActive
    poison?: IsActive
    deploy?: IsActive
    taunt?: IsActive
    assault?: CurrentQuantity
    hazardous?: CurrentQuantity
    power?: CurrentQuantity
    armor?: CurrentQuantity
    cannotReap?: IsActive
    canAlwaysUse?: IsActive

    /**
     * Xanthyx Havester
     */
    canBeUsed?: IsActive

    /**
     * Cards like Cybergiant Rig
     */
    atEndOfYourTurn?: IndividualScript

    /**
     *
     */
    atStartOfYourTurn?: IndividualScript

    /**
     * For things like Tireless Krocag to kill himself
     */
    runAfterAnyAction?: IndividualScript
    /**
     * Cards like Into the Fray
     */
    runAfterAnyActionThisTurn?: IndividualScript
    runAfterAnyActionNextTurn?: IndividualScript
    runAtStartOfNextTurn?: IndividualScript
}

export interface IndividualScript {
    perform: CardScriptExecution
    numberOfTargets?: (state: GameState, config: CardActionConfig) => number //defaults 1
    uniqueTargets?: () => boolean //default true
    upToTargets?: () => boolean //defaults false
    validTargets?: (state: GameState, config: CardActionConfig) => CardInGame[]
    //TODO selectFromChoices () => config.selection
    selectFromChoices?: (state: GameState, config: CardActionConfig) => string[] | number[]
    chosenTargetsAreValid?: (targets: CardInGame[], state: GameState) => boolean
    timesToExecute?: (state: GameState, config: CardActionConfig) => number
}

/**
 * Return a new IndividualScript from CardScriptExecution if it can be executed multiple times. For example, Relentless Assault returns its IndividualScript
 * twice, with the new GameState being resolved in between each execution.
 */
type CardScriptExecution = (state: GameState, config: CardActionConfig) => void | IndividualScript
type IsActive = (state: GameState, config: CardActionConfig) => boolean
type CurrentQuantity = (state: GameState, config: CardActionConfig) => number

export interface CardActionConfig {
    targets: AnyCardInGame[]
    thisCard: CardInGame
    selection: string | number
    triggerCard: CardInGame

    /**
     * Cards like Dance of Doom, Vigor
     */
    quantity?: number

    /**
     * Used by cards like Relentless Assault which can be executed 3 times.
     */
    //TODO I'm using this like a increment in a loop, not sure if thats right (Sky)
    timesExecuted: number
}