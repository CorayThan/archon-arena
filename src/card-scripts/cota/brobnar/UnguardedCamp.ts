import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { checkIfHasTargets, captureAmber } from "../../types/ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state, config) => {
            if (checkIfHasTargets(config, 1)) {
                config.targets.forEach(creature => captureAmber(state, creature as Creature, 1))
            }
        },
        targetOrder: [{
            //variable amount of targets again, each different this time
            areas: [TargetArea.BOARD],
            types: [TargetType.CREATURE],
            friendly: true
        }]
    }
}

cardScripts.scripts.set("unguarded-camp", cardScript)