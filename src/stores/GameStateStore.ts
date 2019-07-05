import * as firebase from "firebase"
import { log, prettyJson } from "../Utils"

export class GameStateStore {

    startGame = async () => {
        const initializeGame = firebase.functions().httpsCallable("initializeGame")
        const gameState = await initializeGame()
        log.info(`Got GameState: ${prettyJson(gameState)}`)
    }
}

export const gameStateStore = new GameStateStore()
