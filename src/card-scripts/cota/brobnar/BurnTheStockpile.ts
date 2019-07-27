import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import {inactivePlayerState, modifyAmber} from "../../ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        perform: (state) => {
            if (inactivePlayerState(state).amber >= 7)
                modifyAmber(inactivePlayerState(state), -4)
        }
    }
}

cardScripts.scripts.set("burn-the-stockpile", cardScript)
