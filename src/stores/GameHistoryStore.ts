import * as firebase from "firebase"
import { computed, observable } from "mobx"
import Action from "../shared/Action"
import { GameHistory } from "../shared/GameHistory"
import { GameStatusEffect } from "../shared/GameStatusEffect"
import { PlayerMessage } from "../shared/PlayerMessage"
import { log } from "../Utils"
import { playerStore } from "./PlayerStore"

export const gameHistoryCollection = () => firebase.firestore().collection("gameHistory")

export class GameHistoryStore {

    @observable
    gameHistory?: GameHistory

    @observable
    updatingGameHistory = false

    private gameHistoryUnlistener?: () => void

    addAction = async (action: Action) => {
        const actions = this.gameHistory!.actions.slice()
        actions.push(action)
        await this.mergeGameHistory({actions})
    }

    replaceStaticEffects = async (activeStaticEffects: GameStatusEffect[]) => {
        await this.mergeGameHistory({activeStaticEffects})
    }

    addMessage = async (message: PlayerMessage) => {
        const messages = this.gameHistory!.messages.slice()
        messages.push(message)
        await this.mergeGameHistory({messages})
    }

    createGameHistory = async () => {
        const matchId = playerStore.currentMatchId
        const history: GameHistory = {actions: [], messages: [], activeStaticEffects: []}
        await gameHistoryCollection().doc(matchId).set(history)
    }

    listenForGameHistoryChanges = () => {
        const matchId = playerStore.currentMatchId
        log.debug("Listen for game history changes with match id " + matchId)
        this.gameHistoryUnlistener = gameHistoryCollection().doc(matchId)
            .onSnapshot((gameHistoryDoc) => {
                const gameHistory = gameHistoryDoc.data() as GameHistory
                log.info(`Got game history change with id ${gameHistoryDoc.id} exists ${gameHistoryDoc.exists}`)
                if (gameHistory) {
                    this.gameHistory = gameHistory
                } else {
                    this.gameHistory = undefined
                }
            })
    }

    stopGameHistoryUpdates = () => {
        if (this.gameHistoryUnlistener) {
            this.gameHistoryUnlistener()
            this.gameHistoryUnlistener = undefined
        }
    }

    @computed
    get actions(): Action[] {
        if (this.gameHistory == null) {
            return []
        }
        return this.gameHistory.actions
    }

    @computed
    get messages(): PlayerMessage[] {
        if (this.gameHistory == null) {
            return []
        }
        return this.gameHistory.messages
    }

    @computed
    get activeStatusEffects(): string[] {
        if (this.gameHistory == null) {
            return []
        }
        return this.gameHistory.activeStaticEffects
    }

    private mergeGameHistory = async (gameHistory: Partial<GameHistory>) => {
        this.updatingGameHistory = true
        await gameHistoryCollection().doc(playerStore.currentMatchId).set(gameHistory, {merge: true})
        this.updatingGameHistory = false
    }
}

export const gameHistoryStore = new GameHistoryStore()
