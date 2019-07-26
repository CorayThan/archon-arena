import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyCreatures, putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Return an enemy creature to its owner’s hand.
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            putInHand(state, config.targets)
        }
    }
}
cardScripts.scripts.set("fear", cardScript)