import * as firebase from "firebase"
import { observable } from "mobx"
import { gameSceneHolder } from "../game/GameScene"
import { GameState } from "../shared/gamestate/GameState"
import { log, prettyJson } from "../Utils"
import { gameHistoryStore } from "./GameHistoryStore"
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
        await gameHistoryStore.createGameHistory()
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
        gameHistoryStore.listenForGameHistoryChanges()
    }

    mergeGameState = async (gameState: Partial<GameState>) => {
        log.debug(`Merging new state`)
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
        await gameHistoryStore.stopGameHistoryUpdates()
        if (matchId != null) {
            await matchStore.cancelMatch(matchId)
        }
        if (gameSceneHolder.gameScene != null) {
            gameSceneHolder.gameScene.game.destroy(true)
        }
    }
}

export const gameStateStore = new GameStateStore()
