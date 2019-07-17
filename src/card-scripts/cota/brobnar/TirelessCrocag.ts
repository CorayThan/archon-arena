import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {destroyCard, enemyPlayer} from "../../ScriptUtils"


const cardScript: CardScript = {
    power: () => 7,
    cannotReap: () => true,
    canAlwaysUse: () => true,
    runAfterAnyAction: {
        perform: (state, config) => {
            if (enemyPlayer(state, config.thisCard).creatures)
                destroyCard(config.thisCard)
        }
    }
}

cardScripts.scripts.set("tireless-crocag", cardScript)