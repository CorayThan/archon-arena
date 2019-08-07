import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allArtifacts, putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Return up to 3 artifacts to their owners’ hands.
    amber: () => 1,
    onPlay: {
        validTargets: allArtifacts,
        numberOfTargets: () => 3,
        upToTargets: () => true,
        perform: (state: GameState, config: CardActionConfig) => {
            putInHand(state, config.targets)
        }
    }
}

cardScripts.scripts.set("grasping-vines", cardScript)