import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, friendlyCreatures, modifyAmber, putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: For each friendly ready creature, gain 1<A>. Return each friendly creature to your hand.
    amber: () => 1,
    onPlay: {
        perform: (state) => {
            const targets = friendlyCreatures(state).filter(x => x.ready)
            modifyAmber(activePlayerState(state), targets.length)
            putInHand(state, targets)
        }
    }
}

cardScripts.scripts.set("total-recall", cardScript)