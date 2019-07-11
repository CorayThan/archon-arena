import Phaser from "phaser"
import React from "react"
import { chatWidth } from "../matchmaking/ChatDrawer"
import Action from "../shared/Action"
import { gameHistoryStore } from "../stores/GameHistoryStore"
import { log, prettyJson } from "../Utils"
import { buildLogForAction } from "./ActionLogger"
import { exec } from "./Actions/Actions"
import GameScene from "./GameScene"

interface Props {
    state: object
}

const width = window.innerWidth - chatWidth
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
            gameHistoryStore.addAction(logObj)
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

        const game = new Phaser.Game(config)
        game.events.once("ready", () => {
            game.canvas.addEventListener("contextmenu", (e: MouseEvent) => {
                e.preventDefault()
                return false
            });

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
