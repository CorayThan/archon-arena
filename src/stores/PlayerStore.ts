import * as firebase from "firebase/app"
import "firebase/firestore"
import {observable} from "mobx"
import {Player} from "../shared/Player"
import {log, prettyJson} from "../Utils"

export const playerCollection = () => firebase.firestore().collection("player")

export class PlayerStore {

    @observable
    player?: Player

    @observable
    findingPlayer = false

    upsertPlayer = async (id: string, player: Player) => {
        this.findingPlayer = true
        await playerCollection().doc(id).set(player)
        await this.findPlayer(id)
    }

    /**
     * Id is the auth user id
     * @param id
     */
    findPlayer = async (id: string) => {
        this.findingPlayer = true
        const playerRef = await playerCollection().doc(id).get()
        if (!playerRef.exists) {
            return undefined
        }
        const player = playerRef.data() as Player
        log.debug("Got player: " + prettyJson(player))
        this.player = player
        this.findingPlayer = false
    }
}

export const playerStore = new PlayerStore()
