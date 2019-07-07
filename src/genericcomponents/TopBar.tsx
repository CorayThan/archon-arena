import {AppBar, Button, Toolbar, Typography} from "@material-ui/core"
import {observer} from "mobx-react"
import * as React from "react"
import {theme} from "../index"
import {Routes} from "../routing/Routes"
import {authStore} from "../stores/AuthStore"
import {playerStore} from "../stores/PlayerStore"
import {LinkButton} from "./LinkButton"

@observer
export class TopBar extends React.Component {
    render() {
        return (
            <AppBar position={"static"}>
                <Toolbar>

                    <div style={{flexGrow: 1}}/>
                    {authStore.authUser ? (
                        <>
                            <Typography style={{marginRight: theme.spacing(2)}}>
                                {playerStore.player ? playerStore.player.displayName : "No Player Profile"}
                            </Typography>
                            <Typography style={{marginRight: theme.spacing(2)}}>{authStore.authUser.displayName}</Typography>
                            <Button color={"inherit"} onClick={authStore.logout}>Logout</Button>
                        </>
                    ) : (
                        <LinkButton color="inherit" to={Routes.login}>Login or Signup</LinkButton>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}
