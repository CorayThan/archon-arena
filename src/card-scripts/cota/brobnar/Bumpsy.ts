import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {inactivePlayerState, modifyAmber} from "../../ScriptUtils"


const cardScript: CardScript = {
    power: () => 5,
    onPlay: {
        perform: (state) => {
            modifyAmber(inactivePlayerState(state), -1)
        }
    }
}

cardScripts.scripts.set("bumpsy", cardScript)