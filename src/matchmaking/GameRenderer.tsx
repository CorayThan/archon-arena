import * as React from "react"
import { Redirect, RouteComponentProps } from "react-router"
import gameState from "../game-state.json"
import Game from "../game/Game"
import { TopBar } from "../genericcomponents/TopBar"
import { Routes } from "../routing/Routes"
import { playerStore } from "../stores/PlayerStore"
import { ChatDrawer } from "./ChatDrawer"

export class GameRenderer extends React.Component<RouteComponentProps> {
    render() {
        let redirect = null
        if (playerStore.player.currentMatchId == null && this.props.location!.pathname.includes(Routes.game)) {
            redirect = <Redirect to={Routes.lobby}/>
        }
        return (
            <div style={{display: "flex"}}>
                {redirect}
                <div>
                    <TopBar/>
                    <Game state={gameState}/>
                </div>
                <ChatDrawer/>
            </div>
        )
    }
}
