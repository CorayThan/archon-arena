import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { checkIfHasTargets, readyCreature, fightUsingCreature } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        perform: (state, config) => {
            if (checkIfHasTargets(config, 1)) {
                readyCreature(config.targets[0] as Creature)
                fightUsingCreature(config.targets[0] as Creature)
            }
            if (checkIfHasTargets(config, 2)) {
                readyCreature(config.targets[1] as Creature)
                fightUsingCreature(config.targets[1] as Creature)
            }
            if (checkIfHasTargets(config, 3)) {
                readyCreature(config.targets[2] as Creature)
                fightUsingCreature(config.targets[2] as Creature)
            }
        },
        //TODO need to define that targets need to be different...
        targetOrder: [{
            areas: [TargetArea.BOARD],
            types: [TargetType.CREATURE],
            friendly: true
        },
        {
            areas: [TargetArea.BOARD],
            types: [TargetType.CREATURE],
            friendly: true
        },
        {
            areas: [TargetArea.BOARD],
            types: [TargetType.CREATURE],
            friendly: true
        }]
    }
}

cardScripts.scripts.set("relentless-assault", cardScript)