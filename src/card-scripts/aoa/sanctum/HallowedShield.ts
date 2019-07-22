import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Action: Choose a creature. For the remainder of the turn, the chosen creature cannot be dealt damage.
    action: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            //TODO add canBeDamaged
            // (config.targets[0] as Creature).canBeDamaged = false
        }
    },

}

cardScripts.scripts.set("hallowed-shield", cardScript)