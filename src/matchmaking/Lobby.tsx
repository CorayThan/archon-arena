import { Button, Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core"
import { observer } from "mobx-react"
import * as React from "react"
import { TopBar } from "../genericcomponents/TopBar"
import { theme } from "../index"
import { authStore } from "../stores/AuthStore"
import { matchStore } from "../stores/MatchStore"
import { playerStore } from "../stores/PlayerStore"

@observer
export class Lobby extends React.Component {

    componentDidMount(): void {
        matchStore.listenForMatches()
    }

    componentWillUnmount(): void {
        matchStore.stopListeningForMatches()
    }

    render() {
        const createGameDisabled = !playerStore.userCanCreateGames || playerStore.player.currentMatchId != null || matchStore.creatingMatch
        return (
            <div>
                <TopBar/>
                <div style={{margin: theme.spacing(2)}}>
                    <Button
                        variant={"contained"}
                        color={"primary"}
                        onClick={matchStore.createMatch}
                        // disabled={createGameDisabled}
                    >
                        Create game
                    </Button>
                    <Grid container={true} spacing={2} style={{marginTop: theme.spacing(2)}}>
                        {matchStore.allMatches.map(match => {
                            return (
                                <Grid item={true} key={match.matchId}>
                                    <Card>
                                        <CardContent>
                                            <Typography>First Player: {match.firstPlayerDisplayName}</Typography>
                                            <Typography>Deck: {match.firstPlayerActiveDeck.name}</Typography>
                                            <Typography>Second Player: {match.secondPlayerDisplayName}</Typography>
                                            <Typography>Deck: {match.secondPlayerActiveDeck ? match.secondPlayerActiveDeck.name : ""}</Typography>
                                        </CardContent>
                                        <CardActions>
                                            {match.secondPlayerId == null && match.firstPlayerId !== authStore.authUserId ? (
                                                <Button onClick={() => matchStore.joinMatch(match.matchId)}>Join</Button>
                                            ) : null}
                                            {match.secondPlayerId == null && match.firstPlayerId === authStore.authUserId ? (
                                                <Button onClick={() => matchStore.cancelMatch(match.matchId)}>Cancel</Button>
                                            ) : null}
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            </div>
        )
    }
}
