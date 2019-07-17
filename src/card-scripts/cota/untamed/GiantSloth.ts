import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {activePlayerState, modifyAmber} from "../../types/ScriptUtils"

//TODO You cannot use this card unless you have discarded an Untamed card from your hand this turn.

const cardScript: CardScript = {
    power: () => 6,
    action: {
        perform: (state) => {
            modifyAmber(activePlayerState(state), 3)
        }
    }
}

cardScripts.scripts.set("giant-sloth", cardScript)