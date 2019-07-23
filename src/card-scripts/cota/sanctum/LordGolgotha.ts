import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { dealDamage, enemyCreatures, getNeighbors } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Before Fight: Deal 3<D> to each neighbor of the creature Lord Golgotha fights.
    power: () => 5,
    armor: () => 2,
    beforeFight: {
        perform: (state, config) => {
            //TODO get targeted creature
            const targets = getNeighbors(enemyCreatures(state), config.targets[0] as Creature)
            dealDamage(targets, 3)
        }
    }
}

cardScripts.scripts.set("lord-golgotha", cardScript)