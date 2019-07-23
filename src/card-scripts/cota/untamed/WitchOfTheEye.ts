import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 3,
    reap: {
        validTargets: (state) => activePlayerState(state).discard,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            putInHand(state, config.targets)
        }
    }
}

cardScripts.scripts.set("witch-of-the-eye", cardScript)