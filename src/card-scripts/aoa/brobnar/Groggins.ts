import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import {enemyCreatures, enemyFlankCreatures, getNeighbors} from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 8,
    validAttackTargets: (state) => {
        const enemies = enemyCreatures(state)
        const flankEnemies = enemyFlankCreatures(state)
        return flankEnemies.filter(creature => creature.taunt
            || enemies.length === 1
            || !getNeighbors(enemies, creature)[0].taunt)
    }
}

cardScripts.scripts.set("groggins", cardScript)
