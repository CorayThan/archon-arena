import { Button } from "@material-ui/core"
import * as React from "react"
import { gameStateStore } from "../stores/GameStateStore"

export class Lobby extends React.Component {
    render() {
        return (
            <div>
                <Button
                    variant={"contained"}
                    color={"primary"}
                    onClick={gameStateStore.startGame}
                >
                    Start Game
                </Button>
            </div>
        )
    }
}
