import { Typography } from "@material-ui/core"
import * as React from "react"
import { TopBar } from "../genericcomponents/TopBar"

export class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <TopBar/>
                <Typography variant={"h2"}>{"Welcome to Archons' Arena"}</Typography>
            </div>
        )
    }
}
