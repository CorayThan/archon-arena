import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { destroyCards, friendlyCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Sacrifice a friendly creature.
    power: () => 7,
    armor: () => 2,
    onPlay: {
        validTargets: friendlyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            destroyCards(state, config.targets)
        }
    }
}
cardScripts.scripts.set("skullion", cardScript)