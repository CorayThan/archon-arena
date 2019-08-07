import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { friendlyPlayer, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Each time a creature is destroyed, its owner gains 1<A>.
    onCreatureDestroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            modifyAmber(friendlyPlayer(state, config.triggerCard), 1)
        }
    }
}
cardScripts.scripts.set("soul-snatcher", cardScript)