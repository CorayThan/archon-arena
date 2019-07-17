import { cardScripts } from "../../types/CardScripts"
import { CardScript } from "../../types/CardScript"
import { Creature } from "../../../shared/gamestate/Creature"
import { enemyCreatures, getNeighbors, dealDamage } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () =>  5,
    beforeFight: {
        perform: (state, config) => {
            const neighbors = getNeighbors(enemyCreatures(state), config.targets[0] as Creature)
            neighbors.forEach(neighbor => dealDamage(neighbor, 2))
        }
    }
}

cardScripts.scripts.set("cowfyne", cardScript)