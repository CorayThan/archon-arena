import * as React from "react"
<<<<<<< HEAD
import { Redirect, RouteComponentProps } from "react-router"
import gameState from "../game-state.json"
=======
import fixture from "../game-state.json"
>>>>>>> Rough draft of connection to firebase
import Game from "../game/Game"
import { TopBar } from "../genericcomponents/TopBar"
import { Routes } from "../routing/Routes"
import { playerStore } from "../stores/PlayerStore"
import { ChatDrawer } from "./ChatDrawer"
import { observer } from "mobx-react"
import { gameStateStore } from "../stores/GameStateStore"
import { GameState } from "../shared/gamestate/GameState"

<<<<<<< HEAD
export class GameRenderer extends React.Component<RouteComponentProps> {
=======
@observer
export class GameRenderer extends React.Component {
>>>>>>> Rough draft of connection to firebase
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
                        state={gameStateStore.activeGameState.data}
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
