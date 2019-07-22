import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures} from "../../ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state, config) => {
            if (config && config.targets && config.targets[0]) {
                // pseudo code
                // dealDamage(target, 3)
            }
        },
        validTargets: allCreatures
    }
}

cardScripts.scripts.set("punch", cardScript)
