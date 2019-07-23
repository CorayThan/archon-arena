import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { alterArmor, alterPower, isFlank } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // While this creature is on a flank, it gets +2 armor and +2 power.
    amber: () => 1,
    staticEffect: (state, config) => {
        if (isFlank(state, config.targets[0] as Creature)) {
            alterArmor(config.targets as Creature[], 2)
            alterPower(config.targets as Creature[], 2)
        }
    }
}

cardScripts.scripts.set("shoulder-armor", cardScript)