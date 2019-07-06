import * as firebase from "firebase/app"
import "firebase/firestore"
import { observable } from "mobx"
import { Player } from "../shared/Player"
import { log, prettyJson } from "../Utils"

export const playerCollection = () => firebase.firestore().collection("player")

export class PlayerStore {

    @observable
    player?: Player

    @observable
    findingPlayer = false

    createPlayer = async (player: Player) => {
        this.findingPlayer = true
        await playerCollection().add(player)
        await this.findPlayer(player.authId)
    }

    findPlayer = async (authId: string) => {
        this.findingPlayer = true
        const playerRef: firebase.firestore.QuerySnapshot = await playerCollection().where("authId", "==", authId).get()
        if (playerRef.empty) {
            return undefined
        }
        if (playerRef.size > 1) {
            throw new Error(`Player with authId ${authId} has more than one result.`)
        }
        const playerDoc = playerRef.docs[0]
        const player = {
            id: playerDoc.id,
            ...playerDoc.data()
        } as unknown as Player
        log.debug("Got player: " + prettyJson(player))
        this.player = player
        this.findingPlayer = false
    }
}

export const playerStore = new PlayerStore()
