import Phaser from "phaser"
import React from "react"
import "./Game.css"
import GameScene from "./GameScene"
import { exec } from "./Actions/Actions"
import { log } from "../Utils"
import { buildLogForAction } from "./ActionLogger"

interface Props {
    state: object
}

const width = 1024
const height = window.innerHeight

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

    dispatch = (action: any) => {
        const { state } = this.props
        this.log.push(buildLogForAction(action, state))
        exec(action, state)

        // temporary
        const div = document.createElement("div")
        // @ts-ignore
        div.innerHTML = (this.log[this.log.length - 1] || { message: `${action.type} log not implemented` }).message
        // @ts-ignore
        document.querySelector(".Game-chat").appendChild(div)
    }

    render() {
        return (
            <div>
                <div className='Game-chat'>
                </div>
                <div id='phaser' className='Game-phaser-container'>
                </div>
            </div>
        )
    }

    shouldComponentUpdate() {
        return false
    }

    componentDidMount() {
        const { state } = this.props
        log.debug(state)

        this.log = []

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
