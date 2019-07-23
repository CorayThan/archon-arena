import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { enemyCreatures, getNeighbors, stunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Zorg enters play stunned. Before Fight: Stun the creature Zorg fights and each of that creature’s neighbors.
    power: () => 7,
    onPlay: {
        perform: (state, config) => stunCreatures([config.thisCard] as Creature[])
    },
    beforeFight: {
        //TODO needs to target just the attacked creature
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            const targets = getNeighbors(enemyCreatures(state), config.targets[0] as Creature).concat(config.targets as Creature[])
            stunCreatures(targets)
        }
    }
}

cardScripts.scripts.set("zorg", cardScript)