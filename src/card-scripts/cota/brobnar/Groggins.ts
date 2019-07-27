import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { enemyCreatures, getNeighbors, onFlank } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 8,
    validAttackTargets: (state) => {
        const enemies = enemyCreatures(state)
        const enemyFlankCreatures = enemies.filter(creature => onFlank(enemies, creature))
        return enemyFlankCreatures.filter(creature => creature.taunt
            || enemies.length === 1
            || !getNeighbors(enemies, creature)[0].taunt)
    }
}

cardScripts.scripts.set("groggins", cardScript)
