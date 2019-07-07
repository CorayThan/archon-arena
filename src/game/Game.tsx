import Phaser from "phaser"
import React from "react"
import {log} from "../Utils"
import "./Game.css"
import GameScene from "./GameScene"

interface Props {
    state: object//GameState
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
    render() {
        return (
            <div id='phaser' className='Game-container'>
            </div>
        )
    }

    shouldComponentUpdate() {
        return false
    }

    componentDidMount() {
        const {state} = this.props
        log.debug(state)
        const game = new Phaser.Game(config)

        game.events.once("ready", () => {
            const scene = game.scene.getScene("GameScene")

            // @ts-ignore
            scene.data.set({
                state,
                width,
                height,
                endTurn: () => {
                    // @ts-ignore
                    state.players[0].creatures.forEach((c: { ready: boolean }) => c.ready = true)
                },
            })
        })
    }
}

export default Game
