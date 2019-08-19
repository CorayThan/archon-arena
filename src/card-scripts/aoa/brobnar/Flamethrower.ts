import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import { allCreatures, dealDamageWithSplash } from "../../ScriptUtils"

const cardScript: CardScript = {
    action: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            dealDamageWithSplash(state, config.targets[0] as Creature, 1, 1)
        }
    }
}

cardScripts.scripts.set("flamethrower", cardScript)
