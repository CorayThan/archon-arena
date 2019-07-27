import * as firebase from "firebase"
import { sortBy } from "lodash"
import { computed, observable } from "mobx"
import { GameChat } from "../shared/GameChat"
import { PlayerMessage } from "../shared/PlayerMessage"
import { log, prettyJson } from "../Utils"
import { playerStore } from "./PlayerStore"

export const gameChatCollection = () => firebase.firestore().collection("gameChat")

export class GameChatStore {

    @observable
    gameChat?: GameChat

    @observable
    updatingGameChat = false

    private gameChatUnlistener?: () => void

    addMessage = async (message: PlayerMessage) => {
        let messages = this.gameChat![message.playerId]
        if (messages == null) {
            messages = []
        }
        message.order = this.messages.length
        messages.push(message)
        await this.mergeGameChat({ [message.playerId!]: messages })
    }

    createGameChat = async () => {
        const matchId = playerStore.currentMatchId
        const chat: GameChat = {}
        await gameChatCollection().doc(matchId).set(chat)
    }

    listenForGameChatChanges = () => {
        const matchId = playerStore.currentMatchId
        log.debug("Listen for game chat changes with match id " + matchId)
        this.gameChatUnlistener = gameChatCollection().doc(matchId)
            .onSnapshot((gameChatDoc) => {
                const gameChat = gameChatDoc.data() as GameChat
                log.info(`Got game chat change with id ${gameChatDoc.id} exists ${gameChatDoc.exists}`)
                if (gameChat) {
                    this.gameChat = gameChat
                } else {
                    this.gameChat = undefined
                }
            })
    }

    stopGameChatUpdates = () => {
        if (this.gameChatUnlistener) {
            this.gameChatUnlistener()
            this.gameChatUnlistener = undefined
        }
    }

    @computed
    get messages(): PlayerMessage[] {
        log.debug(`Gamechat is: ${prettyJson(this.gameChat)}`)
        if (this.gameChat == null) {
            return []
        }
        let allMessages: PlayerMessage[] = []
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [playerId, messages] of Object.entries(this.gameChat)) {
            log.debug(`Player id: ${playerId} messages ${messages}`)
            allMessages.push(...messages)
        }
        allMessages = sortBy(allMessages, ["order", "timestamp"])
        return allMessages
    }

    private mergeGameChat = async (gameChat: Partial<GameChat>) => {
        this.updatingGameChat = true
        await gameChatCollection().doc(playerStore.currentMatchId).set(gameChat, { merge: true })
        this.updatingGameChat = false
    }
}

export const gameChatStore = new GameChatStore()
