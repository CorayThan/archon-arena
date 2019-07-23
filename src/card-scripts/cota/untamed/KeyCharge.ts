import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, forgeKey } from "../../ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        perform: (state) => {
            activePlayerState(state).amber -= 1
            forgeKey(activePlayerState(state))
        }
    }
}

cardScripts.scripts.set("key-charge", cardScript)
