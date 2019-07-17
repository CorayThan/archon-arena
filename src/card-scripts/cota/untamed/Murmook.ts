import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {enemyPlayer} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 3,
    staticEffect: (state, config) => {
        if (config!.thisCard) {
            enemyPlayer(state, config!.thisCard).keyCost += 1
        }
    }

}

cardScripts.scripts.set("murmook", cardScript)