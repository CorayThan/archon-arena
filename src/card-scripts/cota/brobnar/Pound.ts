import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { checkIfHasTargets, dealDamageWithSplash } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state) => {
            if (checkIfHasTargets(config, 1)) {
                const targetedCreature = config.targets[0] as Creature
                dealDamageWithSplash(state, targetedCreature, 2, 1)
            }
        },
        targetOrder: [{
            areas: [TargetArea.BOARD],
            types: [TargetType.CREATURE]
        }]
    }
}

cardScripts.scripts.set("pound", cardScript)