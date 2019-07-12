import * as firebase from "firebase/app"
import "firebase/auth"
import { observable } from "mobx"
import { AuthUser } from "../auth/AuthUser"
import { log } from "../Utils"
import { playerStore } from "./PlayerStore"

export class AuthStore {

    @observable
    authUser?: AuthUser

    @observable
    authUserLoaded = false

    listenForAuthUser = () => {
        firebase.auth().onAuthStateChanged((user) => {
            log.info("Auth state change.")
            if (user) {
                user.getIdToken().then(() => {
                    const displayName = user.displayName ? user.displayName : undefined
                    const email = user.email ? user.email : undefined
                    const emailVerified = user.emailVerified
                    const photoURL = user.photoURL ? user.photoURL : undefined
                    const uid = user.uid
                    this.authUser = {
                        displayName,
                        email,
                        emailVerified,
                        photoURL,
                        uid
                    }
                    if (!playerStore.listeningForPlayer) {
                        playerStore.listenForPlayerChanges(this.authUser.uid)
                        playerStore.listeningForPlayer = true
                    }
                })
            } else {
                this.authUser = undefined
                this.authUserLoaded = true
            }
        })
    }

    logout = () => firebase.auth().signOut()

    get authUserId(): string | undefined {
        if (this.authUser == null) {
            return undefined
        }
        return this.authUser.uid
    }
}

export const authStore = new AuthStore()
