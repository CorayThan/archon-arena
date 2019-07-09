import Phaser from "phaser"
import React from "react"
import { actionStore } from "../stores/ActionStore"
import { chatStore } from "../stores/ChatStore"
import { log, prettyJson } from "../Utils"
import { Action, buildLogForAction } from "./ActionLogger"
import { exec } from "./Actions"
import GameScene from "./GameScene"

interface Props {
    state: object
}

const width = window.innerWidth - chatStore.chatWidth
const height = window.innerHeight - 150

const config: Phaser.Types.Core.GameConfig = {
    parent: "phaser",
    backgroundColor: "#eee",
    scene: [GameScene],
    width,
    height,
    input: {
        mouse: true,
    },
}

class Game extends React.Component<Props> {
    log: object[] = []

    dispatch = (action: Action) => {
        const {state} = this.props
        const logObj = buildLogForAction(action, state)
        log.info("Log is " + prettyJson(logObj))
        if (logObj != null) {
            this.log.push(logObj)
            actionStore.addAction(logObj)
        }
        exec(action, state)


    }

    render() {
        return (
            <div
                id="phaser"
                style={{height: "100%"}}
            />
        )
    }

    // TODO we need to delete this and remove the props from this class
    shouldComponentUpdate() {
        return false
    }

    componentDidMount() {
        const {state} = this.props
        log.debug(state)

        this.log = []
        // @ts-ignore
        window.game = this

        const game = new Phaser.Game(config)
        game.events.once("ready", () => {
            const scene = game.scene.getScene("GameScene")

            // @ts-ignore
            scene.data.set({
                state,
                dispatch: this.dispatch,
                width,
                height,
            })
        })
    }
}

export default Game
