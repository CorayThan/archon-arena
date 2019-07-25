import * as firebase from "firebase"
import { computed, observable } from "mobx"
import { gameSceneHolder } from "../game/GameScene"
import Action from "../shared/Action"
import { GameState } from "../shared/gamestate/GameState"
import { StatusEffect } from "../shared/GameStatusEffect"
import { log, prettyJson } from "../Utils"
import { gameChatStore } from "./GameChatStore"
import { matchStore } from "./MatchStore"
import { playerStore } from "./PlayerStore"

export const gameStateCollection = () => firebase.firestore().collection("gameState")

export class GameStateStore {

    @observable
    activeGameState?: GameState

    @observable
    updatingGameState = false

    private gameStateUnlistener?: () => void

    startGame = async () => {
        const matchId = playerStore.currentMatchId
        const gameState = await firebase.functions().httpsCallable("initializeGame")({matchId})
        log.info(`Created game with gamestate: ${prettyJson(gameState)}`)
        await gameChatStore.createGameChat()
    }

    listenForGameStateChanges = () => {
        const matchId = playerStore.currentMatchId
        log.debug("Listen for game state changes with match id " + matchId)
        this.gameStateUnlistener = gameStateCollection().doc(matchId)
            .onSnapshot((gameStateDoc) => {
                const gameState = gameStateDoc.data() as GameState
                log.info(`Got gamestate change for gameState with id ${gameStateDoc.id} exists ${gameStateDoc.exists}`)
                if (gameState) {
                    this.activeGameState = gameState
                } else {
                    this.activeGameState = undefined
                }
            })
        gameChatStore.listenForGameChatChanges()
    }

    mergeGameState = async (gameState: Partial<GameState>) => {
        log.debug(`Merging new state ${prettyJson(gameState)}`)
        this.updatingGameState = true
        await gameStateCollection().doc(playerStore.currentMatchId).set(gameState, {merge: true})
        this.updatingGameState = false
    }

    quitGame = async () => {
        const matchId = playerStore.currentMatchId
        if (this.gameStateUnlistener) {
            this.gameStateUnlistener()
            this.gameStateUnlistener = undefined
        }
        await gameChatStore.stopGameChatUpdates()
        if (matchId != null) {
            await matchStore.cancelMatch(matchId)
        }
        if (gameSceneHolder.gameScene != null) {
            gameSceneHolder.gameScene.game.destroy(true)
        }
    }

    addAction = async (action: Action) => {
        // temp fix
        const actions = this.activeGameState!.actions || []
        actions.push(action)
        this.activeGameState!.actions = actions
    }

    @computed
    get activeStatusEffects(): Map<number, StatusEffect[]> {
        if (this.activeGameState == null || this.activeGameState.statusEffects == null) {
            return new Map()
        }
        return this.activeGameState.statusEffects
    }

    @computed
    get actions(): Action[] {
        if (this.activeGameState == null || this.activeGameState.actions == null) {
            return []
        }
        return this.activeGameState.actions
    }
}

export const gameStateStore = new GameStateStore()
