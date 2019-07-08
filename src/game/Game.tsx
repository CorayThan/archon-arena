import { observer } from "mobx-react"
import Phaser from "phaser"
import React from "react"
import { chatStore } from "../stores/ChatStore"
import { log } from "../Utils"
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

@observer
export class Game extends React.Component<Props> {
    render() {
        return (
            <div
                id="phaser"
                style={{height: "100%"}}
            />
        )
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
            })
        })
    }
}

export default Game
