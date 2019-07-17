import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {inactivePlayerState, modifyAmber} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 2,
    power: () => 5,
    onPlay: {
        perform: (state) => {
            modifyAmber(inactivePlayerState(state), 1)
        }
    },

}

cardScripts.scripts.set("fuzzy-gruen", cardScript)