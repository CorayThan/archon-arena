import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures, enemyCreatures, getNeighbors, stunCreature} from "../../ScriptUtils"

import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            const targetedCreature = config.targets[0] as Creature
            const neighbors = getNeighbors(enemyCreatures(state), targetedCreature)
            stunCreature(targetedCreature)
            neighbors.forEach(neighbor => stunCreature(neighbor))
        }
    }
}

cardScripts.scripts.set("tremor", cardScript)