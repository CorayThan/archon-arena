import React from "react"
import ReactDOM from "react-dom"
import * as WebFont from "webfontloader"
import App from "./App"
import { initializeGame } from "./gamestate/InitializeGame"
import * as serviceWorker from "./serviceWorker"
import { log, prettyJson } from "./Utils"

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

log.info("Loaded app.")

log.info(`Game state is: ${prettyJson(initializeGame.fakeGame())}`)
