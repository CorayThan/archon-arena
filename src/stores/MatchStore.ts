import * as firebase from "firebase/app"
import "firebase/firestore"
import { observable } from "mobx"
import { Match } from "../shared/Match"
import { log } from "../Utils"
import { authStore } from "./AuthStore"
import { gameStateStore } from "./GameStateStore"
import { playerStore } from "./PlayerStore"

export const matchCollection = () => firebase.firestore().collection("match")

export class MatchStore {

    @observable
    allMatches: Match[] = []

    private matchUnlistener?: () => void

    @observable
    creatingMatch = false

    createMatch = async () => {
        this.creatingMatch = true
        const firstPlayerId = authStore.authUser!.uid
        const firstPlayerDisplayName = playerStore.player.displayName
        const firstPlayerActiveDeck = playerStore.player.activeDeck!

        const savedMatch = await matchCollection().add({
            firstPlayerId,
            firstPlayerDisplayName,
            firstPlayerActiveDeck,
        } as Partial<Match>)
        await playerStore.upsertPlayer({
            currentMatchId: savedMatch.id
        })
        gameStateStore.listenForGameStateChanges()
        this.creatingMatch = false
    }

    joinMatch = async (id: string) => {
        const secondPlayerId = authStore.authUser!.uid
        const secondPlayerDisplayName = playerStore.player.displayName
        const secondPlayerActiveDeck = playerStore.player.activeDeck!

        await matchCollection().doc(id).set({
            secondPlayerId,
            secondPlayerDisplayName,
            secondPlayerActiveDeck,
        } as Partial<Match>, {merge: true})
        log.debug("Upserting player with match id: " + id)
        await playerStore.upsertPlayer({
            currentMatchId: id
        })
        await gameStateStore.startGame()
        gameStateStore.listenForGameStateChanges()
    }

    cancelMatch = async (id: string) => {
        await matchCollection().doc(id).delete()
        await playerStore.upsertPlayer({
            currentMatchId: null
        })
    }

    listenForMatches = () => {
        this.matchUnlistener = matchCollection().onSnapshot((querySnapshot) => {
            this.allMatches = querySnapshot.docs.map(doc => {
                const match = doc.data() as Match
                match.matchId = doc.id
                return match
            })
            // log.debug(`Matches info: ${prettyJson(this.allMatches)}`)
        })
    }

    stopListeningForMatches = () => {
        if (this.matchUnlistener) {
            this.matchUnlistener()
            this.matchUnlistener = undefined
        }
    }
}

export const matchStore = new MatchStore()
