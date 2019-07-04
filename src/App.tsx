import React from "react"
import Game from "./game"
import gameState from "./game-state.json"

const App: React.FC = () => {
    return (
        <div className="App">
            <Game state={gameState}/>
        </div>
    )
}

export default App
