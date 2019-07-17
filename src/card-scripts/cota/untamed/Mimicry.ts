import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {destroyCard} from "../../ScriptUtils"


const cardScript: CardScript = {
//TODO OMG HOW!?!?!?
    onPlay: {
        validTargets: enemyDiscard('actions'),
        numberOfTargets: () => 1,
        perform: (state, config) => {
            destroyCard(config.thisCard)
        }
    }
}
cardScripts.scripts.set("mimicry", cardScript)