import * as React from "react"
import { LinkButton } from "../genericcomponents/LinkButton"
import { Routes } from "../routing/Routes"

export class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <LinkButton
                    color={"inherit"}
                    to={Routes.lobby}
                >
                    Lobby of the Archons
                </LinkButton>
            </div>
        )
    }
}
