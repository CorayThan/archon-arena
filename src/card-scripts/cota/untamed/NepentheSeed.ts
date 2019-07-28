import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, destroyCard, putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    omni: {
        validTargets: (state: GameState) => activePlayerState(state).discard,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            destroyCard(config.thisCard)
            putInHand(state, config.targets)
        }
    }
}

cardScripts.scripts.set("nepenthe-seed", cardScript)