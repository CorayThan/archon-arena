import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures, dealDamage} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            dealDamage(config.targets as Creature[], 3)
        }
    }
}

cardScripts.scripts.set("punch", cardScript)
