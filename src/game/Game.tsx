import Phaser from "phaser"
import React from "react"
import { chatWidth } from "../matchmaking/ChatDrawer"
import Action from "../shared/Action"
import { gameHistoryStore } from "../stores/GameHistoryStore"
import { log, prettyJson } from "../Utils"
import { buildLogForAction } from "./ActionLogger"
import { exec } from "./Actions/Actions"
import GameScene from "./GameScene"

import { GameState } from "../shared/gamestate/GameState"

interface Props {
    state: GameState,
    setState: Function,
}

const width = window.innerWidth - chatWidth
const height = window.innerHeight - 150

const config: Phaser.Types.Core.GameConfig = {
    parent: "phaser",
    backgroundColor: "#eee",
    width,
    height,
    input: {
        mouse: true,
    },
}

class Game extends React.Component<Props> {

    game: Phaser.Game | undefined

    dispatch = (action: Action) => {
        const {state} = this.props
        const logObj = buildLogForAction(action, state)
        log.info("Log is " + prettyJson(logObj))
        if (logObj != null) {
            gameHistoryStore.addAction(logObj)
        }
        exec(action, state)
        console.log(state)

        // this.props.setState({ data: { activePlayer: "stronglink" } })
    }

    render() {
        return (
            <div
                id="phaser"
                style={{height: "100%"}}
            >
            </div>
        )
    }

    componentDidUpdate() {
        if (!this.game && this.props.state) {
            const {state} = this.props
            this.game = new Phaser.Game(config)
            this.game.events.once("ready", () => {
                if (!this.game)
                    return

                this.game.canvas.addEventListener("contextmenu", (e: MouseEvent) => {
                    e.preventDefault()
                    return false
                });

                const scene = new GameScene()
                this.game.scene.add("GameScene", scene, true, {
                    state,
                })
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
}

export default Game
