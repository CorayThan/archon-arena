import * as firebase from "firebase"
import { observable } from "mobx"
import { GameState } from "../shared/gamestate/GameState"
import { log } from "../Utils"
import { playerCollection, playerStore } from "./PlayerStore"

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
        // log.info(`Got GameState: ${prettyJson(gameState)}`)
        await gameStateCollection().doc(matchId).set(gameState)
        // log.info(`Saved gamestate with id ${matchId}`)
    }

    listenForGameStateChanges = () => {
        const matchId = playerStore.currentMatchId
        log.debug("Listen for game state changes with match id " + matchId)
        this.gameStateUnlistener = gameStateCollection().doc(matchId)
            .onSnapshot((gameStateDoc) => {
                const gameState = gameStateDoc.data() as GameState
                log.debug(`Got gamestate change for gameState with id ${gameStateDoc.id} exists ${gameStateDoc.exists}`)
                if (gameState) {
                    this.activeGameState = gameState
                } else {
                    this.activeGameState = undefined
                }
            })
    }

    mergeGameState = async (gameState: Partial<GameState>) => {
        this.updatingGameState = true
        const matchId =
        await playerCollection().doc(playerStore.currentMatchId).set(gameState, {merge: true})
        this.updatingGameState = false
    }

    quitGame = async () => {
        if (this.gameStateUnlistener) {
            this.gameStateUnlistener()
            this.gameStateUnlistener = undefined
        }
        playerStore.upsertPlayer({currentMatchId: null})
    }
}

export const gameStateStore = new GameStateStore()
