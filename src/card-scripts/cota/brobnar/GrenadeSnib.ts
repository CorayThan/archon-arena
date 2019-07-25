import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyPlayer, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 2,
    destroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            modifyAmber(enemyPlayer(state, config.thisCard), -2)
        }
    }
}

cardScripts.scripts.set("grenade-snib", cardScript)
