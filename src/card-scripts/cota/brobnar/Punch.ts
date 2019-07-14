import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { checkIfHasTargets, allCreatures, dealDamage } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state, config) => {
            if (checkIfHasTargets(config, 1)) {
                const target = config.targets[0] as Creature
                dealDamage(target, 3)
            }
        }
        validTargets: allCreatures
    }
}

cardScripts.scripts.set("punch", cardScript)
