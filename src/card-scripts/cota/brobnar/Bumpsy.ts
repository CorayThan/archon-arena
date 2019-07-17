import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { inactivePlayerState } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 5,
    onPlay: {
        perform: (state) => {
            if (inactivePlayerState(state).amber > 0)
                inactivePlayerState(state).amber--
        }
    }
}

cardScripts.scripts.set("bumpsy", cardScript)
