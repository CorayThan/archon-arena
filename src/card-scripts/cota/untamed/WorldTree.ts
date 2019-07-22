import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, putOnTopOfDeck} from "../../ScriptUtils"

const cardScript: CardScript = {
    action: {
        validTargets: (state) => activePlayerState(state).discard,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            putOnTopOfDeck(state, config.targets)
        }
    }
}

cardScripts.scripts.set("world-tree", cardScript)