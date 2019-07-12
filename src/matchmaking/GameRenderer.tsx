import * as React from "react"
import { Redirect, RouteComponentProps } from "react-router"
import Game from "../game/Game"
import { TopBar } from "../genericcomponents/TopBar"
import { Routes } from "../routing/Routes"
import { playerStore } from "../stores/PlayerStore"
import { ChatDrawer } from "./ChatDrawer"
import { observer } from "mobx-react"
import { gameStateStore } from "../stores/GameStateStore"
import { GameState } from "../shared/gamestate/GameState"
import { authStore } from "../stores/AuthStore"

@observer
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
                    <Game
                        state={gameStateStore.activeGameState}
                        playerId={ authStore.authUser === undefined ? '' : authStore.authUser.uid}
                        setState={(gameState: Partial<GameState>) => {
                            gameStateStore.mergeGameState(gameState)
                        }}
                    />
                </div>
                <ChatDrawer/>
            </div>
        )
    }
}
