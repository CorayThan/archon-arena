import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Omni: Sacrifice Key to Dis. Destroy each creature.
    omni: {
        perform: (state: GameState, config: CardActionConfig) => {
            destroyCards(state, allCreatures(state))
            destroyCards(state, [config.thisCard])
        }
    }
}
cardScripts.scripts.set("key-to-dis", cardScript)