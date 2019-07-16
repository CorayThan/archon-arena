import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {allCreatures, dealDamage, putInHand} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    destroyed: {
        perform: (state, config) => {
            putInHand(config.thisCard)
            allCreatures(state).forEach(creature => dealDamage(creature, 3))
        }
    }
}

cardScripts.scripts.set("phoenix-heart", cardScript)