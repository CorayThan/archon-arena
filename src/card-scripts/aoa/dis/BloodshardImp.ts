import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { destroyCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // After a creature reaps, its controller must sacrifice it.
    power: () => 2,
    onAnyReap: {
        perform: (state: GameState, config: CardActionConfig) => {
            destroyCards(state, [config.triggerCard])
        }
    }
}
cardScripts.scripts.set("bloodshard-imp", cardScript)