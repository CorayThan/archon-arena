import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {activePlayerState, modifyAmber} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 2,
    elusive: () => true,
    reap: {
        perform: (state) => {
            modifyAmber(activePlayerState(state), 1)
        }
    }
}

cardScripts.scripts.set("dew-faerie", cardScript)