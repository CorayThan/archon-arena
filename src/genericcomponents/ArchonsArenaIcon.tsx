import * as React from "react"
import ArchonsArena from "../images/archon-arena-symbol.svg"

export const ArchonsArenaIcon = (props: { height?: number, style?: React.CSSProperties }) => {
    return (
        <img alt={"Archons Arena"} src={ArchonsArena} style={{height: props.height ? props.height : 40, ...props.style}}/>
    )
}
