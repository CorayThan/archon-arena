import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { allCreatures, dealDamageWithSplash } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    action: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            dealDamageWithSplash(state, config.targets[0] as Creature, 1, 1)
        }
    }
}

cardScripts.scripts.set("flamethrower", cardScript)