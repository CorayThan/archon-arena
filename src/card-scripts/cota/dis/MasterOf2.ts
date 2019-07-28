import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCards, totalPower } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Reap: You may destroy a creature with 2 power.
    power: () => 4,
    reap: {
        validTargets: (state: GameState) => allCreatures(state)
            .filter(x => totalPower(x) === 2),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            destroyCards(state, config.targets)
        }
    }
}
cardScripts.scripts.set("master-of-2", cardScript)