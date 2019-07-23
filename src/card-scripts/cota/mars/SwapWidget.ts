import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { friendlyCreatures, putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Action: Return a ready friendly Mars creature to your hand.
    // If you do, put a Mars creature with a different name from your hand into play, then ready it.
    action: {
        validTargets: (state) => friendlyCreatures(state).filter(x => x.ready),
        numberOfTargets: () => 1,
        upToTargets: () => true,
        perform: (state, config) => {
            if (0 >= config.targets.length) return
            putInHand(state, config.targets)
            //TODO Put card into play
        }
    }
}

cardScripts.scripts.set("swap-widget", cardScript)