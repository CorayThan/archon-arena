import { Drawer, List, ListItem, ListItemText } from "@material-ui/core"
import { observer } from "mobx-react"
import * as React from "react"
import { chatStore } from "../stores/ChatStore"

@observer
export class ChatDrawer extends React.Component {
    render() {
        return (
            <Drawer
                variant={"permanent"}
                anchor={"right"}
                style={{width: chatStore.chatWidth}}
                PaperProps={{style: {width: chatStore.chatWidth}}}
            >
                <List>
                    <ListItem>
                        <ListItemText>
                            This is a pretend activity / chat log.
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua.
                        </ListItemText>
                    </ListItem>
                </List>
            </Drawer>
        )
    }
}