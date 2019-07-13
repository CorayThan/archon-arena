import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { inactivePlayerState } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        perform: (state) => {
            if (inactivePlayerState(state).amber >= 7)
                inactivePlayerState(state).amber -= 4
        }
    }
}

cardScripts.scripts.set("burn-the-stockpile", cardScript)