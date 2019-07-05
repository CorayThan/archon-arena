import { Button } from "@material-ui/core"
import { ButtonProps } from "@material-ui/core/Button"
import * as React from "react"
import { Link, LinkProps } from "react-router-dom"

export class LinkButton extends React.Component<ButtonProps & Partial<LinkProps>> {
    render() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <Button component={this.props.to != null ? Link as any : undefined} {...this.props}/>
    }
}