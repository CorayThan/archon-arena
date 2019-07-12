import { observer } from "mobx-react"
import * as React from "react"
import { Redirect, RouteComponentProps } from "react-router"
import Game from "../game/Game"
import { TopBar } from "../genericcomponents/TopBar"
import { Routes } from "../routing/Routes"
import { authStore } from "../stores/AuthStore"
import { playerStore } from "../stores/PlayerStore"
import { ChatDrawer } from "./ChatDrawer"
import { gameStateStore } from "../stores/GameStateStore"
import { gameHistoryStore } from "../stores/GameHistoryStore"
import { GameState } from "../shared/gamestate/GameState"
import Action from "../shared/Action"

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
