import { observer } from "mobx-react"
import * as React from "react"
import { Redirect, RouteComponentProps } from "react-router"
import Game from "../game/Game"
import { TopBar } from "../genericcomponents/TopBar"
import { Routes } from "../routing/Routes"
import { authStore } from "../stores/AuthStore"
import { playerStore } from "../stores/PlayerStore"
import { ChatDrawer } from "./ChatDrawer"

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
                        playerId={authStore.authUser === undefined ? "" : authStore.authUser.uid}
                    />
                </div>
                <ChatDrawer/>
            </div>
        )
    }
}
