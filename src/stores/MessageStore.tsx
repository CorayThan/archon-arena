import Snackbar from "@material-ui/core/Snackbar/Snackbar"
import { observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { theme } from "../index"

export type MessageType = "Error" | "Info"

export class MessageStore {

    @observable
    message = ""

    @observable
    action?: React.ReactNode

    @observable
    messageType: MessageType = "Info"

    @observable
    open = false

    setRequestErrorMessage = () => this.setMessage("There was an unexpected error making your request.", "Error")

    setErrorMessage = (message: string) => this.setMessage(message, "Error")
    setInfoMessage = (message: string) => this.setMessage(message, "Info")

    setMessage = (message: string, messageType: MessageType) => {
        this.message = message
        this.messageType = messageType
        this.open = true
    }
}

export const messageStore = new MessageStore()

@observer
export class SnackMessage extends React.Component {

    handleClose = (event: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return
        }
        messageStore.open = false
    }

    colorFromMessageType = (messageType: MessageType) => {
        if (messageType === "Error") {
            return theme.palette.error.dark
        }
        return undefined
    }

    render() {
        const {message} = messageStore

        const actions = []

        if (messageStore.action) {
            actions.push((
                messageStore.action
            ))
        }

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                open={messageStore.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
                ContentProps={{
                    "aria-describedby": "message-id",
                    "style": {backgroundColor: this.colorFromMessageType(messageStore.messageType)}
                }}
                message={<span id="message-id">{message}</span>}
            />
        )
    }
}