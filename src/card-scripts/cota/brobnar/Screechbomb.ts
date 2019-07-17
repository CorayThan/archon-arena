import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {destroyCard, enemyPlayer, modifyAmber} from "../../ScriptUtils"

const cardScript: CardScript = {
    omni: {
        perform: (state, config) => {
            destroyCard(config.thisCard)
            modifyAmber(enemyPlayer(state, config.thisCard), -2)
        }
    }
}

cardScripts.scripts.set("screechbomb", cardScript)
