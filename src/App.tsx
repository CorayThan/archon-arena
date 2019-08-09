import { CssBaseline } from "@material-ui/core"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { observer } from "mobx-react"
import React from "react"
import { theme } from "./config/Styles"
import { ArchonRouter } from "./routing/ArchonRouter"
import { localStorageStore } from "./stores/LocalStorageStore"
import { log } from "./Utils"

const App: React.FC = observer(() => {
    log.debug("theme is " + localStorageStore.lightTheme)
    return (
        <div
            className="App"
        >
            <style>
                {`body { background-color: ${localStorageStore.lightTheme ? "#FFFFFF" : "#666666"}; }`}
            </style>
            <CssBaseline/>
            <MuiThemeProvider theme={theme}>
                <ArchonRouter/>
            </MuiThemeProvider>
        </div>
    )
})

export default App
