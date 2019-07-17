import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {inactivePlayerState, steal} from "../../ScriptUtils"


const cardScript: CardScript = {
    action: {
        perform: (state) => {
            if (inactivePlayerState(state).amber >= 6) steal(state, 1)
        }
    },

}

cardScripts.scripts.set("ritual-of-balance", cardScript)