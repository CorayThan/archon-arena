import { observer } from "mobx-react"
import * as React from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { LoginOrSignup } from "../auth/LoginOrSignup"
import { PlayerProfileContainer } from "../auth/PlayerProfile"
import { TopBar } from "../genericcomponents/TopBar"
import { theme } from "../index"
import { LandingPage } from "../landing/LandingPage"
import { GameRenderer } from "../matchmaking/GameRenderer"
import { Lobby } from "../matchmaking/Lobby"
import { playerStore } from "../stores/PlayerStore"
import { Routes } from "./Routes"

@observer
export class ArchonRouter extends React.Component {
    render() {
        let redirect = null
        if (playerStore.player.displayName === "" && playerStore.userLoaded) {
            redirect = <Redirect to={Routes.profile}/>
        }

        return (
            <BrowserRouter>
                <div>
                    <TopBar/>
                    {redirect}
                    <div
                        style={{margin: theme.spacing(2)}}
                    >
                        <Switch>
                            <Route
                                exact={true}
                                path={Routes.login}
                                component={LoginOrSignup}
                            />
                            <Route
                                exact={true}
                                path={Routes.lobby}
                                component={Lobby}
                            />
                            <Route
                                exact={true}
                                path={Routes.game}
                                component={GameRenderer}
                            />
                            <Route
                                exact={true}
                                path={Routes.profile}
                                component={PlayerProfileContainer}
                            />
                            <Route
                                exact={true}
                                component={LandingPage}
                            />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}