import {cardScripts} from "../../types/CardScripts"
import {CardScript} from "../../types/CardScript"
import {Creature} from "../../../shared/gamestate/Creature"
import {dealDamage, enemyCreatures, getNeighbors} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () =>  2,
    beforeFight: {
        perform: (state, config) => {
            const neighbors = getNeighbors(enemyCreatures(state), config.targets[0] as Creature)
            neighbors.forEach(neighbor => dealDamage(neighbor, 5))
        }
    }
}

cardScripts.scripts.set("bingle-bangbang", cardScript)