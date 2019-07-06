import * as React from "react"
import Game from "../game"
import gameState from "../game-state.json"

export class GameRenderer extends React.Component {
    render() {
        return (
            <div>
                <Game state={gameState}/>
            </div>
        )
    }
}