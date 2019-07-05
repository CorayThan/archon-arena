import { AppBar, Toolbar } from "@material-ui/core"
import * as React from "react"
import { Routes } from "../routing/Routes"
import { LinkButton } from "./LinkButton"

export class TopBar extends React.Component {
    render() {
        return (
            <AppBar position={"static"}>
                <Toolbar>

                    <div style={{flexGrow: 1}}/>
                    <LinkButton color="inherit" to={Routes.login}>Login or Signup</LinkButton>
                </Toolbar>
            </AppBar>
        )
    }
}