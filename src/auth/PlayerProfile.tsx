import { Button, Divider, Grid, Link, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@material-ui/core"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import { observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { theme } from "../config/Styles"
import { EventValue } from "../genericcomponents/EventValue"
import { Loader } from "../genericcomponents/Loader"
import { TopBar } from "../genericcomponents/TopBar"
import { Deck } from "../shared/keyforge/deck/Deck"
import { deckStore } from "../stores/DeckStore"
import { localStorageStore } from "../stores/LocalStorageStore"
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

    @observable
    theme: "light" | "dark" = localStorageStore.lightTheme ? "light" : "dark"

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

    removeDeck = (remove: Deck) => {
        playerStore.upsertPlayer({
            decks: playerStore.player.decks.filter(deck => deck.id !== remove.id)
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

    updateLightOrDark = (event: React.ChangeEvent<unknown>) => {
        const value = (event.target as HTMLInputElement).value
        localStorageStore.setLightTheme(value === "light")
        this.theme = value as "light" | "dark"
    }

    render() {
        return (
            <div>
                <TopBar/>
                <div style={{margin: theme.spacing(2)}}>
                    <Grid
                        container={true}
                        spacing={2}
                    >
                        <Grid item={true} xs={12} sm={3}>
                            <Paper>
                                <Typography
                                    variant={"h4"}
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
                                    <FormControl style={{margin: theme.spacing(2)}}>
                                        <FormLabel>Theme</FormLabel>
                                        <RadioGroup
                                            value={this.theme}
                                            onChange={this.updateLightOrDark}
                                        >
                                            <FormControlLabel value="light" control={<Radio/>} label="Light"/>
                                            <FormControlLabel value="dark" control={<Radio/>} label="Dark"/>
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <Button
                                    onClick={this.savePlayer}
                                    variant={"contained"}
                                    color={"primary"}
                                    style={{margin: theme.spacing(2)}}
                                    disabled={playerStore.updatingPlayer}
                                >
                                    Save Profile
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={12} sm={9}>
                            <Paper>
                                <Typography
                                    variant={"h4"}
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
                                <Table
                                    style={{margin: theme.spacing(2)}}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Name
                                            </TableCell>
                                            <TableCell>
                                                Cards in Deck
                                            </TableCell>

                                            <TableCell/>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {playerStore.player.decks && playerStore.player.decks.map(deck => (
                                            <TableRow key={deck.id}>
                                                <TableCell>
                                                    <Link href={"https://decksofkeyforge.com/decks/" + deck.id}>{deck.name}</Link>
                                                </TableCell>
                                                <TableCell>
                                                    {deck.cards.length}
                                                </TableCell>
                                                <TableCell>
                                                    {playerStore.player.decks !== undefined && playerStore.activeDeckId !== deck.id ? (
                                                        <>
                                                            <Button
                                                                style={{margin: theme.spacing(1)}}
                                                                color={"primary"}
                                                                onClick={() => this.setActiveDeck(deck)}
                                                            >
                                                                Make Active
                                                            </Button>
                                                            <Button
                                                                style={{margin: theme.spacing(1)}}
                                                                color={"secondary"}
                                                                onClick={() => this.removeDeck(deck)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </>
                                                    ) : null}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}
