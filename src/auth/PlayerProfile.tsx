import { Divider, Grid, Paper, TextField, Typography } from "@material-ui/core"
import { observable } from "mobx"
import * as React from "react"
import { EventValue } from "../genericcomponents/EventValue"
import { Loader } from "../genericcomponents/Loader"
import { playerStore } from "../stores/PlayerStore"


export class PlayerProfile extends React.Component {

    @observable
    displayName: string = ""

    render() {
        if (playerStore.player == null) {
            return <Loader/>
        }
        const {displayName, decks} = playerStore.player
        return (
            <Grid container={true}>
                <Grid item={true}>
                    <Paper>
                        <Typography variant={"h3"}>My Profile</Typography>
                        <Divider/>
                        <TextField
                            label={"display name"}
                            value={displayName}
                            variant={"outlined"}
                            onChange={(event: EventValue) => this.displayName = event.target.value}
                        />
                    </Paper>
                </Grid>
                <Grid item={true}>
                    <Paper>
                        <Typography variant={"h3"}>My Decks</Typography>
                        <Divider/>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}