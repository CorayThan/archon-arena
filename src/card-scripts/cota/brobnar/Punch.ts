import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { checkIfHasOneTarget, allCreatures, dealDamage } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        chosenTargetsAreValid: checkIfHasOneTarget,
        perform: (state, config) => {
            const target = config!.targets[0] as Creature
            dealDamage(target, 3)
        }
    }
}

cardScripts.scripts.set("punch", cardScript)
