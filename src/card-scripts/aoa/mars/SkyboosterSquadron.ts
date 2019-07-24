import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Reap: Return Skybooster Squadron to your hand.
    power: () => 4,
    reap: {
        perform: (state, config) => {
            putInHand(state, [config.thisCard])
        }
    }
}

cardScripts.scripts.set("skybooster-squadron", cardScript)