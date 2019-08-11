import { observer } from "mobx-react"
import * as React from "react"
import { localStorageStore } from "../stores/LocalStorageStore"

export const VerticalDivider = observer(() => (
    <div style={{display: "flex", flexDirection: "column"}}>
        <div style={{flexGrow: 1, width: 1, backgroundColor: localStorageStore.lightTheme ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)"}}/>
    </div>
))
