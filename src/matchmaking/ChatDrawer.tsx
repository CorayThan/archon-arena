import { Drawer, List, ListItem, ListItemText } from "@material-ui/core"
import { observer } from "mobx-react"
import * as React from "react"
import { actionStore } from "../stores/ActionStore"
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
                        <ListItemText primaryTypographyProps={{variant: "h4"}}>
                            Action Log
                        </ListItemText>
                    </ListItem>
                    {actionStore.actionLog.map((action, idx) => (
                        <ListItem key={idx}>
                            <ListItemText>
                                {action.message}
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        )
    }
}