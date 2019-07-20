import * as firebase from "firebase/app"
import "firebase/firestore"
import { computed, observable } from "mobx"
import { Player } from "../shared/Player"
import { log, prettyJson } from "../Utils"
import { authStore } from "./AuthStore"
import { gameStateStore } from "./GameStateStore"

export const playerCollection = () => firebase.firestore().collection("player")

export class PlayerStore {

    @observable
    player: Player = {
        decks: [],
        displayName: "",
    }

    @observable
    updatingPlayer = false

    listeningForPlayer = false

    upsertPlayer = async (player: Partial<Player>) => {
        this.updatingPlayer = true
        await playerCollection().doc(authStore.authUser!.uid).set(player, {merge: true})
        this.updatingPlayer = false
    }

    /**
     * Id is the auth user id
     * @param id
     */
    listenForPlayerChanges = (id: string) => {
        log.debug("Start listening for player changes with id " + id)
        playerCollection().doc(id)
            .onSnapshot((playerDoc) => {
                log.info("Player change.")
                const player = playerDoc.data() as unknown as Player
                if (player) {

                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const {activeDeck, decks, ...rest} = player
                    log.debug("Got new player info " + prettyJson(rest))
                    if (player.decks == null) {
                        player.decks = []
                    }
                    this.player = player
                    if (player.currentMatchId) {
                        gameStateStore.listenForGameStateChanges()
                    }
                } else {
                    this.player = {
                        decks: [],
                        displayName: "",
                    }
                }
                authStore.authUserLoaded = true
            })
    }

    @computed
    get userLoaded(): boolean {
        return !!(authStore.authUserLoaded && authStore.authUser && !this.updatingPlayer)
    }

    @computed
    get userCanCreateGames(): boolean {
        return !!(this.userLoaded && this.player.activeDeck)
    }

    @computed
    get activeDeckId(): string | undefined {
        if (this.player.activeDeck) {
            return this.player.activeDeck.id
        }
        return undefined
    }

    /**
     * Throws exception if there is no current match id.
     */
    @computed
    get currentMatchId(): string {
        if (this.player.currentMatchId == null) {
            throw new Error(`Requested current match id but it was null or undefined.`)
        }
        return this.player.currentMatchId
    }
}

export const playerStore = new PlayerStore()
