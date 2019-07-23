import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Omega. (After you play this card,
    // end this step.)
    // Play: Return a card from your discard pile to your hand.
    amber: () => 1,
    omega: () => true,
    onPlay: {
        validTargets: (state) => activePlayerState(state).discard,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            putInHand(state, config.targets)
        }
    }
}

cardScripts.scripts.set("gravid-cycle", cardScript)