import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { destroyCards, inactivePlayerState, steal } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Action: Sacrifice Guard Disguise. If your opponent has 3A or fewer, steal 3A.
    action: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (3 >= inactivePlayerState(state).amber) {
                steal(state, 3)
            }
            destroyCards(state, [config.thisCard])
        }
    }
}
cardScripts.scripts.set("guard-disguise", cardScript)