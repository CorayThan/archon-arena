import { Button, Card, CardActions, CardContent, Link, Typography } from "@material-ui/core"
import Divider from "@material-ui/core/Divider"
import { observer } from "mobx-react"
import * as React from "react"
import { theme } from "../config/Styles"
import { Houses } from "../genericcomponents/Houses"
import { VerticalDivider } from "../genericcomponents/VerticalDivider"
import { Deck } from "../shared/keyforge/deck/Deck"
import { Match } from "../shared/Match"
import { authStore } from "../stores/AuthStore"
import { matchStore } from "../stores/MatchStore"

@observer
export class MatchCard extends React.Component<{ match: Match }> {
    render() {
        const {match} = this.props
        return (
            <Card style={{width: 640, height: 320}}>
                <CardContent>
                    <div style={{display: "grid", justifyItems: "center", alignItems: "end", gridTemplateColumns: "100fr 1fr 100fr"}}>
                        <Typography variant={"h4"} color={"primary"}>{match.firstPlayerDisplayName}</Typography>
                        <Typography variant={"h4"}>vs.</Typography>
                        <Typography variant={"h4"} color={"primary"}>
                            {match.secondPlayerDisplayName ? match.secondPlayerDisplayName : ""}
                        </Typography>
                    </div>
                    <Divider style={{marginTop: theme.spacing(1), marginBottom: theme.spacing(1)}}/>
                    <div style={{display: "flex"}}>
                        <DeckInfo deck={match.firstPlayerActiveDeck}/>
                        <VerticalDivider/>
                        {match.secondPlayerActiveDeck ? (
                            <DeckInfo deck={match.secondPlayerActiveDeck}/>
                        ) : (
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: 320}}>
                                {match.secondPlayerId == null && match.firstPlayerId !== authStore.authUserId ? (
                                    <Button variant={"outlined"} color={"inherit"} onClick={() => matchStore.joinMatch(match.matchId)}>Join</Button>
                                ) : null}
                                {match.secondPlayerId == null && match.firstPlayerId === authStore.authUserId ? (
                                    <Button variant={"outlined"} color={"inherit"} onClick={() => matchStore.cancelMatch(match.matchId)}>Cancel</Button>
                                ) : null}
                            </div>
                        )}
                    </div>
                    <Divider style={{marginTop: theme.spacing(1)}}/>
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        )
    }
}

const DeckInfo = (props: { deck: Deck }) => (
    <div style={{width: 320}}>
        <Houses houses={props.deck.houses} style={{margin: theme.spacing(2)}}/>
        <div style={{margin: theme.spacing(2)}}>
            <Link color={"textPrimary"} variant={"h5"} href={"https://decksofkeyforge.com/decks/" + props.deck.id}>
                {props.deck.name}
            </Link>
        </div>
    </div>
)