import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {inactivePlayerState} from "../../ScriptUtils"


const cardScript: CardScript = {
    power: () => 3,
    staticEffect: (state, config) => {
        if (config!.thisCard) {
            inactivePlayerState(state).keyCost += 1
        }
    }

}

cardScripts.scripts.set("murmook", cardScript)