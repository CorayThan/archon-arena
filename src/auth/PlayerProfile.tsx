import { Button, Divider, Grid, List, ListItem, Paper, TextField, Typography } from "@material-ui/core"
import { observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { EventValue } from "../genericcomponents/EventValue"
import { Loader } from "../genericcomponents/Loader"
import { theme } from "../index"
import { Deck } from "../shared/keyforge/deck/Deck"
import { deckStore } from "../stores/DeckStore"
import { messageStore } from "../stores/MessageStore"
import { playerStore } from "../stores/PlayerStore"

@observer
export class PlayerProfileContainer extends React.Component {
    render() {
        if (!playerStore.userLoaded) {
            return <Loader/>
        }
        return <PlayerProfile/>
    }
}

@observer
export class PlayerProfile extends React.Component {

    private static deckIdRegex = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g

    @observable
    deckId: string = ""

    @observable
    displayName = ""

    componentDidMount(): void {
        this.displayName = playerStore.player.displayName
    }

    savePlayer = () => {
        const nameTrimmed = this.displayName.trim()
        if (nameTrimmed.length < 1) {
            messageStore.setErrorMessage("Please make sure your display name is at least one character long.")
        } else {
            playerStore.upsertPlayer({
                displayName: this.displayName
            })
        }
    }

    setActiveDeck = (deck: Deck) => {
        playerStore.upsertPlayer({
            activeDeck: deck
        })
    }

    addDeck = () => {
        const deckIdMatches = this.deckId.match(PlayerProfile.deckIdRegex)
        if (deckIdMatches == null || deckIdMatches.length === 0) {
            messageStore.setErrorMessage(`No deck id in ${this.deckId}`)
        } else if (deckIdMatches.length > 1) {
            messageStore.setErrorMessage(`Found more than one deck id in ${this.deckId}`)
        } else {
            deckStore.addDeck(deckIdMatches[0])
        }
    }

    render() {
        return (
            <div>
                <Grid
                    container={true}
                    spacing={2}
                >
                    <Grid item={true} xs={12} sm={3}>
                        <Paper>
                            <Typography
                                variant={"h3"}
                                style={{padding: theme.spacing(2)}}
                            >
                                My Profile
                            </Typography>
                            <Divider/>
                            <div>
                                <TextField
                                    style={{margin: theme.spacing(2)}}
                                    label={"display name"}
                                    value={this.displayName}
                                    variant={"outlined"}
                                    onChange={(event: EventValue) => this.displayName = event.target.value}
                                />
                            </div>
                            <Button
                                onClick={this.savePlayer}
                                variant={"contained"}
                                color={"primary"}
                                style={{margin: theme.spacing(2)}}
                            >
                                Save Profile
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item={true} xs={12} sm={9}>
                        <Paper>
                            <Typography
                                variant={"h3"}
                                style={{padding: theme.spacing(2)}}
                            >
                                My Decks
                            </Typography>
                            <Divider/>

                            <Typography
                                style={{margin: theme.spacing(2)}}
                            >
                                Active deck: {playerStore.player.activeDeck ? playerStore.player.activeDeck.name : ""}
                            </Typography>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <TextField
                                    style={{margin: theme.spacing(2)}}
                                    label={"deck id or url"}
                                    value={this.deckId}
                                    variant={"outlined"}
                                    onChange={(event: EventValue) => this.deckId = event.target.value}
                                />
                                <div>
                                    <Button onClick={this.addDeck}>Add Deck</Button>
                                </div>
                            </div>
                            <Button
                                onClick={deckStore.clearDecks}
                                style={{margin: theme.spacing(2)}}
                            >
                                Remove all decks
                            </Button>
                            <List
                                style={{margin: theme.spacing(2)}}
                            >
                                {playerStore.player.decks.map(deck => (
                                    <ListItem key={deck.id}>
                                        <Typography>{deck.name}</Typography>
                                        <div style={{flexGrow: 1}}/>
                                        {playerStore.activeDeckId !== deck.id ? (
                                            <Button color={"primary"} onClick={() => this.setActiveDeck(deck)}>Make Active</Button>
                                        ) : null}
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
