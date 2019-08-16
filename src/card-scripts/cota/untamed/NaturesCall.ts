import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    // Play: Return up to 3 creatures to their owners’ hands.
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 3,
        upToTargets: () => true,
        perform: (state: GameState, config: CardActionConfig) => {
            putInHand(state, config.targets)
        }
    }
}

cardScripts.scripts.set("natures-call", cardScript)