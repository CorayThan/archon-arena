import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { House } from "../../../shared/keyforge/house/House"
import { checkIfHasOneTarget, friendlyCreatures, enableFighting } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        //TODO Is this the proper way to make Houses be the targets? Houses definitely aren't CardInPlay...
        validTargets: Object.values(House),
        choosenTargetsAreValid: checkIfHasOneTarget,
        perform: (state) => {
            const chosenHouse = config!.targets[0] as House
        	friendlyCreatures(state)
        	.filter(creature => creature.backingCard.house == chosenHouse)
        	.forEach(creature => enableFighting(creature))
        }
    }
}

cardScripts.scripts.set("brothers-in-battle", cardScript)