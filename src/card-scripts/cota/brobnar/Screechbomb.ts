import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { destroyCards, enemyPlayer, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    omni: {
        perform: (state: GameState, config: CardActionConfig) => {
            destroyCards(state, [config.thisCard])
            modifyAmber(enemyPlayer(state, config.thisCard), -2)
        }
    }
}

cardScripts.scripts.set("screechbomb", cardScript)
