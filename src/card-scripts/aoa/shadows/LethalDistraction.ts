import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { allCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Choose a creature. For the remainder of the turn, whenever this creature takes damage, it takes an additional 2D.
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: () => {
            //TODO Turneffect to increase damage
        }
    }
}
cardScripts.scripts.set("lethal-distraction", cardScript)