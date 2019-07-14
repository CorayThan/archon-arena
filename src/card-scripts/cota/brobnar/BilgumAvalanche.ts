import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {activePlayerState, dealDamage, enemyCreatures, friendlyPlayer} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 5,
    onKeyForge: {
        perform: (state, config) => {
            if (activePlayerState(state) === friendlyPlayer(state, config.thisCard)) {
                enemyCreatures(state).forEach(creature => dealDamage(creature, 2))
            }
        }
    }
}

cardScripts.scripts.set("bilgum-avalanche", cardScript)