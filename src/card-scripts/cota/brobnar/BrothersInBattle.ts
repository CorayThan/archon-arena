import { CardScript, TargetType, TargetArea } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { checkIfHasTargets, friendlyCreatures } from "../../types/ScriptUtils"
import { enableFighting } from "../../types/ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state) => {
        	if (checkIfHasTargets(config, 1)) {
                const chosenHouse = config.targets[0] as House
            	friendlyCreatures(state)
            	//can't check a creature's house???
            	.filter(creature => creature.house == chosenHouse)
            	.forEach(creature => enableFighting(creature))
            }
        },
        targetOrder: [{
            types: [TargetType.HOUSE],
            //Why do I need to choose an area when choosing a house :thinking:
            areas: [TargetArea.BOARD]
        }]
    }
}

cardScripts.scripts.set("brothers-in-battle", cardScript)