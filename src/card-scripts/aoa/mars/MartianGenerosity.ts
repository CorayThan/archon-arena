import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, drawCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Lose all of your A. Draw 2 cards for each A lost.
    amber: () => 1,
    onPlay: {
        perform: (state) => {
            drawCards(activePlayerState(state), activePlayerState(state).amber * 2)
            activePlayerState(state).amber = 0
        }
    }
}

cardScripts.scripts.set("martian-generosity", cardScript)