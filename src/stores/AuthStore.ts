import * as firebase from "firebase/app"
import "firebase/auth"
import { observable } from "mobx"
import { AuthUser } from "../auth/AuthUser"

export class AuthStore {

    @observable
    authUser?: AuthUser

    listenForAuthUser = () => {
        firebase.auth().onAuthStateChanged((user) => {
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
                })
            } else {
                this.authUser = undefined
            }
        })
    }

    logout = () => firebase.auth().signOut()
}

export const authStore = new AuthStore()