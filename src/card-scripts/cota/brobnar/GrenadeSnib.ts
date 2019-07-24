import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { enemyPlayerForCard, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 2,
    destroyed: {
        perform: (state, config) => {
            modifyAmber(enemyPlayerForCard(state, config.thisCard), -2)
        }
    }
}

cardScripts.scripts.set("grenade-snib", cardScript)
