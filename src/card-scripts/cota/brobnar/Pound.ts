import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { allCreatures, checkIfHasOneTarget, dealDamageWithSplash } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        chosenTargetsAreValid: checkIfHasOneTarget,
        perform: (state, config) => {
            dealDamageWithSplash(state, config.targets[0] as Creature, 2, 1)
        }
    }
}

cardScripts.scripts.set("pound", cardScript)