import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { checkIfHasOneTarget, allCreatures, dealDamageWithSplash } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        validTargets: allCreatures,
        choosenTargetsAreValid: checkIfHasOneTarget,
        perform: (state, config) => {
            dealDamageWithSplash(state, config!.targets[0] as Creature, 4, 2)
        }
    }
}

cardScripts.scripts.set("lava-ball", cardScript)