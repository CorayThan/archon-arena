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

interface IndividualScript {
    perform: CardScriptExecution
    numberOfTargets?: (state: GameState) => number
    uniqueTargets?: () => boolean
    upToTargets?: () => boolean
    validTargets?: (state: GameState, config: CardActionConfig) => CardInGame[]
    chosenTargetsAreValid?: (targets: CardInGame[], state: GameState) => boolean
}

/**
 * Return a new IndividualScript from CardScriptExecution if it can be executed multiple times. For example, Relentless Assault returns its IndividualScript
 * twice, with the new GameState being resolved in between each execution.
 */
type CardScriptExecution = (state: GameState, config: CardActionConfig) => void | IndividualScript
type IsActive = (state: GameState) => boolean
type CurrentQuantity = (state: GameState, config: CardActionConfig) => number

interface CardActionConfig {
    targets: AnyCardInGame[]
    thisCard: CardInGame

    /**
     * Cards like Dance of Doom, Vigor
     */
    quantity?: number

    /**
     * Used by cards like Relentless Assault which can be executed 3 times.
     */
    timesExecuted: number
}