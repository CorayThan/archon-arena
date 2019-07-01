import * as loglevel from "loglevel"
import React from 'react'
import ReactDOM from 'react-dom'
import * as WebFont from "webfontloader"
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'

export const log = loglevel
log.setDefaultLevel("debug")

WebFont.load({
    google: {
        families: ["Roboto:300,400,500,700"]
    },
})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

log.info("Loaded app.")
