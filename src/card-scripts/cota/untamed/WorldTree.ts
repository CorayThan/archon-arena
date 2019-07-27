import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, putOnTopOfDeck } from "../../ScriptUtils"

const cardScript: CardScript = {
    action: {
        validTargets: (state: GameState) => activePlayerState(state).discard,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            putOnTopOfDeck(state, config.targets)
        }
    }
}

cardScripts.scripts.set("world-tree", cardScript)