import { Box, Button, Divider, Drawer, ListItem, ListItemText, Popover, TextField, Typography } from "@material-ui/core"
import { autorun, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { AEvent } from "../game/AEvent"
import { EventValue } from "../genericcomponents/EventValue"
import { theme } from "../index"
import { gameHistoryStore } from "../stores/GameHistoryStore"
import { gameStateStore } from "../stores/GameStateStore"
import { playerStore } from "../stores/PlayerStore"
import "./ChatDrawer.css"

export const chatWidth = 440

@observer
export class ChatDrawer extends React.Component {

    @observable
    currentMessage = ""

    chatBottomRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>()
    actionsBottomRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>()

    sendMessage = () => {
        const message = this.currentMessage.trim()
        if (message.length > 0) {
            gameHistoryStore.addMessage({message, playerUsername: playerStore.player.displayName})
            this.currentMessage = ""
        }
    }

    componentDidMount(): void {
        autorun(() => {
            gameHistoryStore.messages.length
            window.setTimeout(() => {
                const current = this.chatBottomRef.current
                if (current) {
                    current.scrollIntoView({behavior: "auto"})
                }
            }, 100)
        })


        autorun(() => {
            gameHistoryStore.actions.length
            window.setTimeout(() => {
                const current = this.actionsBottomRef.current
                if (current) {
                    current.scrollIntoView({behavior: "auto"})
                }
            }, 100)
        })
    }

    render() {
        return (
            <Drawer
                variant={"permanent"}
                anchor={"right"}
                style={{width: chatWidth}}
                PaperProps={{style: {width: chatWidth}}}
            >
                <Box height={"10%"}>
                    <ListItem>
                        <ListItemText primaryTypographyProps={{variant: "h6"}}>
                            Active Effects
                        </ListItemText>
                    </ListItem>
                    {gameStateStore.activeStatusEffects.size > 0 ? (
                        <ListItem>
                            <ListItemText primaryTypographyProps={{variant: "subtitle1", color: "error"}}>
                                {/*{gameStateStore.activeStatusEffects.join(" – ")}*/}
                            </ListItemText>
                        </ListItem>
                    ) : null}
                </Box>
                <Divider/>
                <ListItem>
                    <ListItemText primaryTypographyProps={{variant: "h4"}}>
                        Action Log
                    </ListItemText>
                </ListItem>
                <Box height={"34%"} style={{overflowY: "auto"}}>
                    {gameHistoryStore.actions.map((action, idx) => (
                        <ListItem key={idx}>
                            <ListItemText>
                                {action.message}
                            </ListItemText>
                        </ListItem>
                    ))}
                    <div ref={this.actionsBottomRef}/>
                </Box>
                <Box height={"40%"} style={{display: "flex", flexDirection: "column"}}>
                    <Divider/>
                    <ListItem>
                        <ListItemText primaryTypographyProps={{variant: "h4"}}>
                            Chat
                        </ListItemText>
                    </ListItem>
                    <div style={{overflowY: "auto"}}>
                        {gameHistoryStore.messages.map((message, idx) => (
                            <ListItem key={idx}>
                                <ListItemText>
                                    <b>{message.playerUsername}</b>: {message.message}
                                </ListItemText>
                            </ListItem>
                        ))}
                        <div ref={this.chatBottomRef}/>
                    </div>
                    <div style={{flexGrow: 1}}/>
                    <TextField
                        value={this.currentMessage}
                        fullWidth={true}
                        autoFocus={false}
                        multiline={true}
                        rows={3}
                        rowsMax={5}
                        variant={"filled"}
                        placeholder={"message..."}
                        onChange={(event: EventValue) => this.currentMessage = event.target.value}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                this.sendMessage()
                            }
                        }}
                    />
                </Box>
                <Box height={"4%"} style={{display: "flex", flexDirection: "column"}}>
                    <div style={{flexGrow: 1}}/>
                    <div
                        style={{display: "flex"}}
                    >
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            style={{margin: theme.spacing(2)}}
                            onClick={() => {
                                const gameState = gameStateStore.activeGameState!
                                const activePlayer = gameState.activePlayer!
                                const newActivePlayer = activePlayer.id === gameState.playerTwoState.player.id ? gameState.playerOneState.player : gameState.playerTwoState.player
                                gameHistoryStore.addAction({
                                    message: `Next Turn, active player ${newActivePlayer.name}`,
                                    type: AEvent.EndTurn,
                                    player: activePlayer
                                })
                                gameStateStore.mergeGameState({activePlayer: newActivePlayer})
                            }}
                        >
                            End Turn
                        </Button>
                        <div style={{flexGrow: 1}}/>
                        <ShortCutInfo/>
                        <Button
                            onClick={gameStateStore.quitGame}
                            color={"primary"}
                            style={{margin: theme.spacing(2)}}
                        >
                            Quit
                        </Button>
                    </div>
                </Box>
            </Drawer>
        )
    }
}

@observer
class ShortCutInfo extends React.Component {

    @observable
    anchorEl?: Element

    render() {
        return (
            <div>
                <Button
                    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => this.anchorEl = event.currentTarget}
                    style={{margin: theme.spacing(2)}}
                >
                    Shortcuts
                </Button>
                <Popover
                    open={!!this.anchorEl}
                    anchorEl={this.anchorEl}
                    onClose={() => this.anchorEl = undefined}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                >
                    <div
                        style={{padding: theme.spacing(2)}}
                    >
                        <ShortCutsSection
                            title={"Cards"}
                            shortCuts={[
                                {key: "B + left click", to: " to discard"},
                                {key: "M + left click", to: " to move to hand"},
                                {key: "[hotkey] + left click", to: " to reverse action"},
                            ]}
                        />
                        <Typography variant="h5" style={{marginTop: "10px"}}>
                            Creatures
                        </Typography>
                        <Typography>
                            <span className="ChatDrawer-hotkey">D + left click</span> to add damage
                        </Typography>
                        <Typography>
                            <span className="ChatDrawer-hotkey">A + left click</span> to add æmber
                        </Typography>
                        <Typography>
                            <span className="ChatDrawer-hotkey">P + left click</span> to add power
                        </Typography>
                        <Typography>
                            <span className="ChatDrawer-hotkey">C + left click</span> to capture æmber
                        </Typography>
                        <Typography>
                            <span className="ChatDrawer-hotkey">S + left click</span> to stun or unstun
                        </Typography>
                        <Typography>
                            <span className="ChatDrawer-hotkey">T + left click</span> to add or remove taunt
                        </Typography>
                        <Typography>
                            <span className="ChatDrawer-hotkey">L + left click</span> to move left
                        </Typography>
                        <Typography>
                            <span className="ChatDrawer-hotkey">R + left click</span> to move right
                        </Typography>
                        <Typography>
                            <span className="ChatDrawer-hotkey">X + left click</span> to add doom token
                        </Typography>
                        <Typography variant="h5" style={{marginTop: "10px"}}>
                            Artifacts
                        </Typography>
                        <Typography>
                            <span className="ChatDrawer-hotkey">A + left click</span> to add æmber
                        </Typography>
                        <Typography variant="h5" style={{marginTop: "10px"}}>
                            Card Piles
                        </Typography>
                        <Typography>
                            <span className="ChatDrawer-hotkey">left click</span> to take top card
                        </Typography>
                        <Typography>
                            <span className="ChatDrawer-hotkey">right click</span> to view contents
                        </Typography>
                        <Typography variant="h5" style={{marginTop: "10px"}}>
                            Library
                        </Typography>
                        <Typography>
                            <span className="ChatDrawer-hotkey">shift + left click</span> to shuffle
                        </Typography>
                        <ShortCutsSection title={"Discard"} shortCuts={[{key: "shift + left click", to: "to shuffle into library"}]}/>
                    </div>
                </Popover>
            </div>
        )
    }
}

const ShortCutsSection = (props: { title: string, shortCuts: { key: string, to: string }[] }) => (
    <>
        <Typography variant="h5" style={{marginTop: theme.spacing(1)}}>
            {props.title}
        </Typography>
        {props.shortCuts.map(shortCut => (
            <div key={shortCut.key}>
                <Typography>
                    <span
                        style={{
                            background: "rgb(242, 242, 242)",
                            fontSize: 14,
                            textTransform: "uppercase"
                        }}
                    >
                        {shortCut.key}
                    </span> {shortCut.to}
                </Typography>
            </div>
        ))}
    </>
)
