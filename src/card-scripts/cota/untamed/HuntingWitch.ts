import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, friendlyCreatures, modifyAmber} from "../../ScriptUtils"


const cardScript: CardScript = {
    power: () => 2,
    staticEffect: (state) => {
        //TODO if action; creature entering board
        if (friendlyCreatures.enter) {
            modifyAmber(activePlayerState(state), 1)
        }
    }
}

cardScripts.scripts.set("hunting-witch", cardScript)