import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { enemyCreatures, onFlank, getNeighbors } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    validAttackTargets: (state) => {
    	const enemies = enemyCreatures(state)
    	const enemyFlankCreatures = enemies.filter(creature => onFlank(enemies, creature))
    	enemyFlankCreatures.filter(creature => creature.taunt 
    		|| getNeighbors(enemies, creature).length === 0 
    		|| !getNeighbors(enemies, creature)[0].taunt)
		return enemyFlankCreatures.map(creature => creature.id)
    }
}

cardScripts.scripts.set("groggins", cardScript)