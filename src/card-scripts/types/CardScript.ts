import { GameState } from "../../shared/gamestate/GameState"

export interface CardScript {
    amber?: number
    entersPlay?: IndividualScript
    onPlay?: IndividualScript
    beforeFight?: IndividualScript
    fight?: IndividualScript
    onAnyFight?: IndividualScript
    omni?: IndividualScript
    reap?: IndividualScript
    action?: IndividualScript
    destroyed?: IndividualScript
    leavesPlay?: IndividualScript

    /**
     * Like Storm Crawler
     */
    damageDealtWhenFighting?: number

    /**
     * Like Lollop
     */
    damageDealtWhenAttacked?: number



    /**
     * For things like Banner of Battle or Iron Obelisk to modify game state before it is passed to a card script or auto game functions (like killing
     * creatures or forging keys) are run.
     */
    staticEffect?: CardScriptExecution

    alpha?: boolean
    omega?: boolean
    elusive?: boolean
    skirmish?: boolean
    poison?: boolean
    deploy?: boolean
    taunt?: boolean
    assault?: number
    hazardous?: number
    power?: number
    armor?: number
    cannotReap?: boolean
    canAlwaysUse?: boolean

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
    targetOrder?: TargetConfig[]
}

type CardScriptExecution = (state: GameState, config?: CardActionConfig) => void | IndividualScript

interface TargetConfig {
    types: TargetType[]
    areas: TargetArea[]
    friendly?: boolean
    random?: boolean
}

export enum TargetType {
    CREATURE,
    ARTIFACT,
    UPGRADE,
    FIGHT,
    HOUSE
}

export enum TargetArea {
    DISCARD,
    HAND,
    LIBRARY,
    ARCHIVE,
    BOARD
}

interface CardActionConfig {
    targets?: string[]
    quantity?: number
    thisCardId?: string
}
