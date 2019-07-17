import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {inactivePlayerState} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 4,
    onPlay: {
        perform: (state) => {
            inactivePlayerState(state).amber += 2
        }
    }
}

cardScripts.scripts.set("fertility-chant", cardScript)