import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Action: Choose a creature. For the remainder of the turn, the chosen creature cannot be dealt damage.
    action: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            //TODO add canBeDamaged
            // (config.targets[0] as Creature).canBeDamaged = false
        }
    }
}

cardScripts.scripts.set("hallowed-shield", cardScript)