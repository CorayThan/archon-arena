import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { checkIfHasTargets, dealDamageWithSplash } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    staticEffect: (state, config) => {
        //need to get the creature this is attached to 
        const creature = ???
        creature.power += 5
    }
}

cardScripts.scripts.set("blood-of-titans", cardScript)