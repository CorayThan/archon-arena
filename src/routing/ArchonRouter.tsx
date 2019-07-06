import * as React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { LoginOrSignup } from "../auth/LoginOrSignup"
import { TopBar } from "../genericcomponents/TopBar"
import { theme } from "../index"
import { LandingPage } from "../landing/LandingPage"
import { GameRenderer } from "../matchmaking/GameRenderer"
import { Lobby } from "../matchmaking/Lobby"
import { Routes } from "./Routes"

export class ArchonRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <TopBar/>
                    <div style={{marginBottom: theme.spacing(2)}}/>
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
                            component={LandingPage}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}