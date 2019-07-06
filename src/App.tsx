import { CssBaseline } from "@material-ui/core"
import React from "react"
import { ArchonRouter } from "./routing/ArchonRouter"

const App: React.FC = () => {
    return (
        <div className="App">
            <CssBaseline/>
            <ArchonRouter/>
        </div>
    )
}

export default App
