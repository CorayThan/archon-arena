import { observer } from "mobx-react"
import * as React from "react"
import { Redirect, RouteComponentProps } from "react-router"
import Game from "../game/Game"
import { Loader } from "../genericcomponents/Loader"
import { TopBar } from "../genericcomponents/TopBar"
import { Routes } from "../routing/Routes"
import Action from "../shared/Action"
import { GameState } from "../shared/gamestate/GameState"
import { authStore } from "../stores/AuthStore"
import { gameHistoryStore } from "../stores/GameHistoryStore"
import { gameStateStore } from "../stores/GameStateStore"
import { playerStore } from "../stores/PlayerStore"
import { ChatDrawer } from "./ChatDrawer"

//import fixture from "../fixtures/game-state.json"

@observer
export class GameRenderer extends React.Component<RouteComponentProps> {
    render() {
        let redirect = null

        if (playerStore.player.currentMatchId == null && this.props.location!.pathname.includes(Routes.game)) {
            redirect = <Redirect to={Routes.lobby}/>
        }
        // for local game development
        //redirect = null

        if (gameStateStore.activeGameState == null) {
            return <Loader/>
        }

        return (
            <div style={{display: "flex"}}>
                {redirect}
                <div>
                    <TopBar/>
                    <Game
                        playerId={authStore.authUser === undefined ? "" : authStore.authUser.uid}
                        state={gameStateStore.activeGameState}
                        setState={(gameState: Partial<GameState>) => {
                            gameStateStore.mergeGameState(gameState)
                        }}
                        logAction={(action: Action) => {
                            gameHistoryStore.addAction(action)
                        }}
                        // for local game development
                        //playerId={"GQYXEhjmxEMlVcVzZY0gmYpnd872"}
                        // @ts-ignore
                        //state={fixture}
                        //setState={(gameState: Partial<GameState>) => {}}
                        //logAction={() => {}}
                    />
                </div>
                <ChatDrawer/>
            </div>
        )
    }
}
