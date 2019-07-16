import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {inactivePlayerState, modifyAmber} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 5,
    onPlay: {
        perform: (state) => {
            if (inactivePlayerState(state).amber >= 7)
                modifyAmber(inactivePlayerState(state), -2)
        }
    }
}

cardScripts.scripts.set("lomir-flamefist", cardScript)