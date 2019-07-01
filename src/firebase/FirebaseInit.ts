import * as firebase from "firebase/app"
import "firebase/firestore"
import {log} from "../index"

document.addEventListener('DOMContentLoaded', function () {
    log.debug("init firebase")

    try {
        const app = firebase.app()
        // @ts-ignore
        const features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function')
        document.getElementById('load')!.innerHTML = `Firebase SDK loaded with ${features.join(', ')}`
    } catch (e) {
        console.error(e)
        document.getElementById('load')!.innerHTML = 'Error loading the Firebase SDK, check the console.'
    }

    firebase.initializeApp({
        apiKey: "AIzaSyDu0Zg8VmVa664dCTWErmcn3yDE1OJBfs0",
        authDomain: "forge-of-the-archons.firebaseapp.com",
        databaseURL: "https://forge-of-the-archons.firebaseio.com",
        projectId: "forge-of-the-archons",
        storageBucket: "forge-of-the-archons.appspot.com",
        messagingSenderId: "81787944178",
        appId: "1:81787944178:web:36aa683bc37bfedc"
    })
})

export const firestore = firebase.firestore()
