import { Box, Button, Divider, Drawer, ListItem, ListItemText, TextField } from "@material-ui/core"
import { observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { EventValue } from "../genericcomponents/EventValue"
import { theme } from "../index"
import { gameHistoryStore } from "../stores/GameHistoryStore"
import { gameStateStore } from "../stores/GameStateStore"
import { playerStore } from "../stores/PlayerStore"

export const chatWidth = 480

@observer
export class ChatDrawer extends React.Component {

    @observable
    currentMessage = ""

    sendMessage = () => {
        const message = this.currentMessage.trim()
        if (message.length > 0) {
            gameHistoryStore.addMessage({message, playerUsername: playerStore.player.displayName})
            this.currentMessage = ""
        }
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
                    {gameHistoryStore.activeStatusEffects.length > 0 ? (
                        <ListItem>
                            <ListItemText primaryTypographyProps={{variant: "subtitle1", color: "error"}}>
                                {gameHistoryStore.activeStatusEffects.join(" – ")}
                            </ListItemText>
                        </ListItem>
                    ) : null}
                </Box>
                <Box height={"40%"}>
                    <Divider/>
                    <ListItem>
                        <ListItemText primaryTypographyProps={{variant: "h4"}}>
                            Action Log
                        </ListItemText>
                    </ListItem>
                    <div style={{overflowY: "auto"}}>
                        {gameHistoryStore.actions.map((action, idx) => (
                            <ListItem key={idx}>
                                <ListItemText>
                                    {action.message}
                                </ListItemText>
                            </ListItem>
                        ))}
                    </div>
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
                    </div>
                    <div style={{flexGrow: 1}}/>
                    <TextField
                        value={this.currentMessage}
                        fullWidth={true}
                        autoFocus={true}
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
