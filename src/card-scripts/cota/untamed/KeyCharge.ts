import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {activePlayerState, modifyAmber} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        perform: (state) => {
            modifyAmber(activePlayerState(state), -1)
            if (activePlayerState(state).amber >= activePlayerState(state).keyCost) {
                modifyAmber(activePlayerState(state), -(activePlayerState(state).keyCost))
                activePlayerState(state).keys += 1
            }
        }
    }
}

cardScripts.scripts.set("key-charge", cardScript)