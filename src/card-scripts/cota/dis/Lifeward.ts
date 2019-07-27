import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { destroyCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Omni: Sacrifice Lifeward. Your opponent cannot play creatures on their next turn.
    amber: () => 1,
    omni: {
        perform: (state: GameState, config: CardActionConfig) => {
            //TODO inactivePlayerState(state).canPlayCards = false
            destroyCards(state, [config.thisCard])
        }
    }
}
cardScripts.scripts.set("lifeward", cardScript)