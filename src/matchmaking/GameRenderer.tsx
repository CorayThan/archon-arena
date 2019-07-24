// To run this application without a backend component
// we to feed a GameState fixture to our Game instance.
//
// All code segments beginning with UNCOMMENT need to be uncommented.
// All code segments beginning with COMMENT need to be commented out.

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
import { gameStateStore } from "../stores/GameStateStore"
import { playerStore } from "../stores/PlayerStore"
import { ChatDrawer } from "./ChatDrawer"
// UNCOMMENT for local development
import fixture from "../fixtures/game-state.json"

@observer
export class GameRenderer extends React.Component<RouteComponentProps> {
    render() {
        let redirect = null

        if (playerStore.player.currentMatchId == null && this.props.location!.pathname.includes(Routes.game)) {
            redirect = <Redirect to={Routes.lobby} />
        }
        // UNCOMMENT for local development
        redirect = null

        if (gameStateStore.activeGameState == null) {
            // COMMENT for local development
            // return <Loader />
        }

        return (
            <div style={{ display: "flex" }}>
                {redirect}
                <div>
                    <TopBar />
                    <Game
                        // COMMENT for local development
                        // playerId={authStore.authUser === undefined ? "" : authStore.authUser.uid}
                        // state={gameStateStore.activeGameState}
                        // setState={(gameState: Partial<GameState>) => {
                        //     gameStateStore.mergeGameState(gameState)
                        // }}
                        // logAction={(action: Action) => {
                        //     gameStateStore.addAction(action)
                        // }}

                        // UNCOMMENT for local development
                        playerId={"GQYXEhjmxEMlVcVzZY0gmYpnd872"}
                        state={fixture}
                        setState={(gameState: Partial<GameState>) => { }}
                        logAction={() => { }}
                    />
                </div>
                <ChatDrawer />
            </div>
        )
    }
}
