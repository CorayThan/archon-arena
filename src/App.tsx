import { CssBaseline } from "@material-ui/core"
import { MuiThemeProvider } from "@material-ui/core/styles"
import React from "react"
import { theme } from "./index"
import { ArchonRouter } from "./routing/ArchonRouter"

const App: React.FC = () => {
    return (
        <div className="App">
            <CssBaseline/>
            <MuiThemeProvider theme={theme}>
                <ArchonRouter/>
            </MuiThemeProvider>
        </div>
    )
}

export default App
