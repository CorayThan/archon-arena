import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { alterPower, isFlank } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Staunch Knight gets +2 power while it is on a flank.
    power: () => 4,
    armor: () => 2,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        if (isFlank(state, config.thisCard as Creature)) {
            alterPower([config.thisCard] as Creature[], 2)
        }
    }
}

cardScripts.scripts.set("staunch-knight", cardScript)