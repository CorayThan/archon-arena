import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { checkIfHasTargets, stunCreature, getNeighbors, enemyCreatures } from "../../types/ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state, config) => {
            if (checkIfHasTargets(config, 1)) {
                const targetedCreature = config.targets[0] as Creature
                const neighbors = getNeighbors(enemyCreatures(state), targetedCreature)
                stunCreature(targetedCreature)
                neighbors.forEach(neighbor => stunCreature(neighbor))
            }
        },
        targetOrder: [{
            areas: [TargetArea.BOARD],
            types: [TargetType.CREATURE],
            friendly: false
        }]
    }
}

cardScripts.scripts.set("tremor", cardScript)