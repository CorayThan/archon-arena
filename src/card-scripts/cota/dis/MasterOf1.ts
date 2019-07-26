import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCards, totalPower } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Reap: You may destroy a creature with 1 power.
    power: () => 4,
    reap: {
        validTargets: (state: GameState) => allCreatures(state)
            .filter(x => totalPower(x) === 1),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            destroyCards(state, config.targets)
        }
    }
}
cardScripts.scripts.set("master-of-1", cardScript)