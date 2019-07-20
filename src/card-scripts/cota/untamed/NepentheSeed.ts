import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, destroyCard, putInHand} from "../../ScriptUtils"

const cardScript: CardScript = {
    omni: {
        validTargets: (state) => activePlayerState(state).discard,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            destroyCard(config.thisCard)
            putInHand(state, config.targets)
        }
    }
}

cardScripts.scripts.set("nepenthe-seed", cardScript)