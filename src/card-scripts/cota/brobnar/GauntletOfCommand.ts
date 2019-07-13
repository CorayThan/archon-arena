import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { checkIfHasTargets, readyCreature, fightUsingCreature } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    action: {
    	perform: (state, config) => {
            if (checkIfHasTargets(config, 1)) {
                const targetedCreature = config.targets[0] as Creature
                readyCreature(targetedCreature)
                fightUsingCreature(targetedCreature)
            }
        },
        targetOrder: [{
            areas: [TargetArea.BOARD],
            types: [TargetType.CREATURE],
            friendly: true
        }]
    }
}

cardScripts.scripts.set("gauntlet-of-command", cardScript)