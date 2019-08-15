import * as firebase from "firebase/app"
import "firebase/firestore"
import React from "react"
import ReactDOM from "react-dom"
import * as WebFont from "webfontloader"
import App from "./App"
import { FontsConfig } from "./config/FontsConfig"
import * as serviceWorker from "./serviceWorker"
import { authStore } from "./stores/AuthStore"
import { isDev, log } from "./Utils"

FontsConfig.loadFonts()

log.debug("init firebase")

firebase.initializeApp({
    apiKey: "AIzaSyDu0Zg8VmVa664dCTWErmcn3yDE1OJBfs0",
    authDomain: "forge-of-the-archons.firebaseapp.com",
    databaseURL: "https://forge-of-the-archons.firebaseio.com",
    projectId: "forge-of-the-archons",
    storageBucket: "forge-of-the-archons.appspot.com",
    messagingSenderId: "81787944178",
    appId: "1:81787944178:web:36aa683bc37bfedc"
})
if (isDev) {
    firebase.functions().useFunctionsEmulator("http://localhost:5000")
}

WebFont.load({
    google: {
        families: ["Roboto:300,400,500,700"]
    },
})

ReactDOM.render(<App/>, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

authStore.listenForAuthUser()

log.info("Loaded app.")
