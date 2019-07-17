import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { enemyCreatures, onFlank, getNeighbors } from "../../types/ScriptUtils"

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