import { Button, Grid } from "@material-ui/core"
import { observer } from "mobx-react"
import * as React from "react"
import { theme } from "../config/Styles"
import { TopBar } from "../genericcomponents/TopBar"
import { matchStore } from "../stores/MatchStore"
import { playerStore } from "../stores/PlayerStore"
import { MatchCard } from "./MatchCard"

@observer
export class Lobby extends React.Component {

    componentDidMount(): void {
        matchStore.listenForMatches()
    }

    componentWillUnmount(): void {
        matchStore.stopListeningForMatches()
    }

    render() {
        const createGameDisabled = (!playerStore.userCanCreateGames || playerStore.player.currentMatchId != null || matchStore.creatingMatch) &&
            playerStore.player.displayName != "coraythan" && playerStore.player.displayName != "stronglink"
        return (
            <div>
                <TopBar/>
                <div style={{margin: theme.spacing(2)}}>
                    <Button
                        variant={"contained"}
                        color={"primary"}
                        onClick={matchStore.createMatch}
                        disabled={createGameDisabled}
                    >
                        Create game
                    </Button>
                    <Grid container={true} spacing={2} style={{marginTop: theme.spacing(2)}}>
                        {matchStore.allMatches.map(match => {
                            return (
                                <Grid item={true} key={match.matchId}>
                                    <MatchCard match={match}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            </div>
        )
    }
}
