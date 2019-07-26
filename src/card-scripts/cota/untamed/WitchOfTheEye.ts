import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 3,
    reap: {
        validTargets: (state: GameState) => activePlayerState(state).discard,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            putInHand(state, config.targets)
        }
    }
}

cardScripts.scripts.set("witch-of-the-eye", cardScript)