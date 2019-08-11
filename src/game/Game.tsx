import { debounce } from "lodash"
import * as mobx from "mobx"
import { autorun } from "mobx"
import Phaser from "phaser"
import React from "react"
import "../card-scripts/imports"
import Action from "../shared/Action"
import { GameState } from "../shared/gamestate/GameState"
import { localStorageStore } from "../stores/LocalStorageStore"
import { log, prettyJson } from "../Utils"
import { buildLogForAction } from "./ActionLogger"
import { exec } from "./Actions/Actions"
import GameScene from "./GameScene"

interface Props {
    playerId: string | undefined
    state: GameState | undefined
    setState: Function
    logAction: Function
}

const width = window.innerWidth - localStorageStore.chatWidth
const height = window.innerHeight - 70

const config: Phaser.Types.Core.GameConfig = {
    parent: "phaser",
    backgroundColor: "#eee",
    type: Phaser.CANVAS,
    width,
    height,
    input: {
        mouse: true,
    },
    render: {
        roundPixels: true,
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
    }
}

class Game extends React.Component<Props> {

    state: {
        width: number,
        height: number,
    }
    game: Phaser.Game | undefined
    // Store a state object stripped of proxies defined by mobx
    gameState: GameState | undefined

    constructor(props: Props) {
        super(props)
        this.state = {
            width: window.innerWidth - localStorageStore.chatWidth,
            height: window.innerHeight - 70,
        }
        this.handleResize = debounce(this.handleResize.bind(this), 100)
        this.updateGameState = debounce(this.updateGameState.bind(this), 200)

        autorun(() => {
            log.debug(`Chat width changed to: ${localStorageStore.chatWidth}`)
            this.handleResize()
        })
    }

    dispatch = (action: Action) => {
        const state = this.gameState
        if (!state)
            throw new Error("Action dispatched before game state available")

        const logObj = buildLogForAction(action, state)
        log.info("Log is " + prettyJson(logObj))
        if (logObj != null) {
            this.props.logAction(logObj)
        }

        exec(action, state)
        this.updateGameState(state)
    }

    updateGameState(state: GameState) {
        this.props.setState(state)
    }

    render() {
        const {
            width,
            height
        } = this.state
        return (
            <div id="phaser" style={{ width, height }}/>
        )
    }

    componentDidMount() {
        this.update()
        window.addEventListener("resize", this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize)
    }

    componentDidUpdate() {
        this.update()
    }

    handleResize() {
        this.setState({
            width: window.innerWidth - localStorageStore.chatWidth,
            height: window.innerHeight - 70,
        })
    }

    update() {
        if (this.props.state) {
            this.gameState = mobx.toJS(this.props.state)
            const state = this.gameState
            const {playerId} = this.props

            if (this.game) {
                const scene = this.game.scene.getScene("GameScene") as GameScene
                if (scene) {
                    scene.state = state
                    scene.render()
                    if (state.activePlayer.id === playerId) {
                        //scene.sys.resume()
                    } else {
                        //scene.sys.pause()
                    }
                }
            } else {
                this.game = new Phaser.Game(config)
                this.game.events.once("ready", () => {
                    if (!this.game)
                        return

                    this.game.canvas.addEventListener("contextmenu", (e: MouseEvent) => {
                        e.preventDefault()
                        return false
                    })

                    const scene = new GameScene(state, playerId!, this.dispatch, width, height)
                    this.game.scene.add("GameScene", scene, true)
                })
            }
        }
    }
}

export default Game
