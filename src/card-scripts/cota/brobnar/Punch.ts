import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {Creature} from "../../../shared/gamestate/Creature"
import {allCreatures, dealDamage} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            dealDamage(config!.targets[0] as Creature, 3)
        }
    }
}

cardScripts.scripts.set("punch", cardScript)
