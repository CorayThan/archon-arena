import {Button, Divider, Grid, List, ListItem, Paper, TextField, Typography} from "@material-ui/core"
import {observable} from "mobx"
import {observer} from "mobx-react"
import * as React from "react"
import {Redirect} from "react-router"
import {EventValue} from "../genericcomponents/EventValue"
import {theme} from "../index"
import {Routes} from "../routing/Routes"
import {Deck} from "../shared/keyforge/deck/Deck"
import {authStore} from "../stores/AuthStore"
import {playerStore} from "../stores/PlayerStore"

@observer
export class PlayerProfile extends React.Component {

    @observable
    displayName: string = ""

    @observable
    decks: Deck[] = []

    componentDidMount(): void {
        if (playerStore.player) {
            this.displayName = playerStore.player.displayName
            this.decks = playerStore.player.decks
        }
    }

    savePlayer = () => {
        playerStore.upsertPlayer(authStore.authUser!.uid, {
            displayName: this.displayName,
            decks: this.decks
        })
    }

    render() {
        if (authStore.authUser == null) {
            return <Redirect to={Routes.landing}/>
        }
        return (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
                <Grid container={true} spacing={2}>
                    <Grid item={true}>
                        <Paper>
                            <Typography variant={"h3"}>My Profile</Typography>
                            <Divider/>
                            <TextField
                                style={{margin: theme.spacing(2)}}
                                label={"display name"}
                                value={this.displayName}
                                variant={"outlined"}
                                onChange={(event: EventValue) => this.displayName = event.target.value}
                            />
                        </Paper>
                    </Grid>
                    <Grid item={true}>
                        <Paper>
                            <Typography variant={"h3"}>My Decks</Typography>
                            <Divider/>
                            <div style={{display: "flex"}}>
                                <TextField
                                    style={{marginRight: theme.spacing(2)}}
                                    label={"display name"}
                                    value={this.displayName}
                                    variant={"outlined"}
                                    onChange={(event: EventValue) => this.displayName = event.target.value}
                                />
                                <Button>Add Deck</Button>
                            </div>
                            <List>
                                {this.decks.map(deck => (
                                    <ListItem key={deck.id}>
                                        <Typography>{deck.name}</Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
