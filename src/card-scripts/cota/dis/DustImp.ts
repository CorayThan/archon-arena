import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { friendlyPlayer, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Destroyed: Gain 2<A>.
    power: () => 2,
    destroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            modifyAmber(friendlyPlayer(state, config.thisCard), 2)
        }
    }
}
cardScripts.scripts.set("dust-imp", cardScript)