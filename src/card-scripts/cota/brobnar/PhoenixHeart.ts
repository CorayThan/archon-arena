import {CardActionConfig, CardScript} from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {allCreatures, dealDamage, putInHand} from "../../ScriptUtils"

const cardScript: CardScript = {
    destroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            putInHand(state, config.targets)
            dealDamage(allCreatures(state), 3)
        }
    }
}

cardScripts.scripts.set("phoenix-heart", cardScript)
