import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, dealDamage, enemyCreatures, friendlyPlayerForCard} from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 5,
    onKeyForge: {
        perform: (state, config) => {
            if (activePlayerState(state) === friendlyPlayerForCard(state, config.thisCard)) {
                enemyCreatures(state).forEach(creature => dealDamage(creature, 2))
            }
        }
    }
}

cardScripts.scripts.set("bilgum-avalanche", cardScript)
