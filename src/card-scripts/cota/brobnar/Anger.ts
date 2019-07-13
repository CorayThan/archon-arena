import { cardScripts } from "../../types/CardScripts"
import { CardScript, TargetType, TargetArea } from "../../types/CardScript"
import { Creature } from "../../../shared/gamestate/Creature"
import { checkIfHasTargets, readyCreature, fightUsingCreature } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () =>  1,
    onPlay: {
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

cardScripts.scripts.set("anger", cardScript)