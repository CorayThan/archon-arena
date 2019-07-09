import * as React from "react"
import gameState from "../game-state.json"
import Game from "../game/Game"
import { TopBar } from "../genericcomponents/TopBar"
import { ChatDrawer } from "./ChatDrawer"

export class GameRenderer extends React.Component {
    render() {
        return (
            <div style={{display: "flex"}}>
                <div>
                    <TopBar/>
                    <Game state={gameState}/>
                </div>
                <ChatDrawer/>
            </div>
        )
    }
}
