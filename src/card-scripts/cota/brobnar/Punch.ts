import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { allCreatures } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state, config) => {
            if (config && config.targets && config.targets[0]) {
                const target = config.targets[0]
                // pseudo code
                // dealDamage(target, 3)
            }
        },
        validTargets: allCreatures
    }
}

cardScripts.scripts.set("punch", cardScript)
