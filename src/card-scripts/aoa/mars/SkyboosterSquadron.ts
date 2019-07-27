import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Reap: Return Skybooster Squadron to your hand.
    power: () => 4,
    reap: {
        perform: (state: GameState, config: CardActionConfig) => {
            putInHand(state, [config.thisCard])
        }
    }
}

cardScripts.scripts.set("skybooster-squadron", cardScript)