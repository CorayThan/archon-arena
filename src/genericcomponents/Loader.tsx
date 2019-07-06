import CircularProgress from "@material-ui/core/CircularProgress"
import * as React from "react"

export const Loader = (props: { show?: boolean }) => {
    const hide = props.show === false
    if (hide) {
        return null
    }
    return (
        <div style={{display: "flex", justifyContent: "center"}}><CircularProgress/></div>
    )
}
