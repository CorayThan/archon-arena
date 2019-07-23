import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, forgeKey, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 3,
    onPlay: {
        perform: (state) => {
            modifyAmber(activePlayerState(state), -1)
            forgeKey(activePlayerState(state))
        }
    }
}

cardScripts.scripts.set("chota-hazri", cardScript)