import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { enemyPlayer, inactivePlayerState } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 3,
    staticEffect: (state, config) => {
        enemyPlayer(state, config!.thisCard).keyCost += 1
    }
}

cardScripts.scripts.set("murmook", cardScript)