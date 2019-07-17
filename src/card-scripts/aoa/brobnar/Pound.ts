import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {Creature} from "../../../shared/gamestate/Creature"
import {allCreatures, dealDamageWithSplash} from "../../ScriptUtils"


const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            dealDamageWithSplash(state, config.targets[0] as Creature, 2, 1)
        }
    }
}

cardScripts.scripts.set("pound", cardScript)