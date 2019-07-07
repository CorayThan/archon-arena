import * as firebase from "firebase/app"
import "firebase/firestore"
import { observable } from "mobx"
import { Match } from "../shared/Match"
import { log, prettyJson } from "../Utils"
import { authStore } from "./AuthStore"
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
        const firstPlayerActiveDeckId = playerStore.player.activeDeck!.id
        const firstPlayerDeckName = playerStore.player.activeDeck!.name

        const savedMatch = await matchCollection().add({
            firstPlayerId,
            firstPlayerDisplayName,
            firstPlayerActiveDeckId,
            firstPlayerDeckName
        })
        await playerStore.upsertPlayer({
            currentMatchId: savedMatch.id
        })
        this.creatingMatch = false
    }

    joinMatch = async (id: string) => {
        const secondPlayerId = authStore.authUser!.uid
        const secondPlayerDisplayName = playerStore.player.displayName
        const secondPlayerActiveDeckId = playerStore.player.activeDeck!.id
        const secondPlayerDeckName = playerStore.player.activeDeck!.name

        await matchCollection().doc(id).set({
            secondPlayerId,
            secondPlayerDisplayName,
            secondPlayerActiveDeckId,
            secondPlayerDeckName
        }, {merge: true})
        log.debug("Upserting player with match id: " + id)
        await playerStore.upsertPlayer({
            currentMatchId: id
        })
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
            log.debug(`Matches info: ${prettyJson(this.allMatches)}`)
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