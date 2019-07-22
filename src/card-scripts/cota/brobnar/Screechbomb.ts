import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {destroyCard, enemyPlayerForCard, modifyAmber} from "../../ScriptUtils"

const cardScript: CardScript = {
    omni: {
        perform: (state, config) => {
            destroyCard(state, config.thisCard)
            modifyAmber(enemyPlayerForCard(state, config.thisCard), -2)
        }
    }
}

cardScripts.scripts.set("screechbomb", cardScript)
