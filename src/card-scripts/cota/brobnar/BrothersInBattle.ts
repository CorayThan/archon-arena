import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {House} from "../../../shared/keyforge/house/House"
import {enableFighting, friendlyCreatures} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: Object.values(House),
        numberOfTargets: () => 1,
        perform: (state, config) => {
            const chosenHouse = config.targets[0] as House
        	friendlyCreatures(state)
        	.filter(creature => creature.backingCard.house == chosenHouse)
        	.forEach(creature => enableFighting(creature))
        }
    }
}

//cardScripts.scripts.set("brothers-in-battle", cardScript)