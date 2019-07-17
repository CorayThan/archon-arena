import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import {inactivePlayerState, modifyAmber} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        perform: (state) => {
            if (inactivePlayerState(state).amber >= 7)
                modifyAmber(inactivePlayerState(state), -4)
        }
    }
}

cardScripts.scripts.set("burn-the-stockpile", cardScript)