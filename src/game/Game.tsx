import Phaser from "phaser"
import React from "react"
import "./Game.css"
import GameScene from "./GameScene"
import { GameState } from "../gamestate/types/GameState"
import { exec } from "./Actions"
import { log } from "../Utils"

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

    dispatch = (action: any) => {
        const { state } = this.props
        exec(action, state)
    }

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
        const { state } = this.props
        log.debug(state)
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
