import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, purgeCards, totalPower } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Purge a creature with power 5 or higher.
    onPlay: {
        validTargets: (state: GameState) => allCreatures(state).filter(x => totalPower(x) >= 5),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            purgeCards(state, config.targets)
        }
    }
}

cardScripts.scripts.set("the-harder-they-come", cardScript)