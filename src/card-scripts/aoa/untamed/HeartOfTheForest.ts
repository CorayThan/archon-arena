import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { enemyPlayer, friendlyPlayer } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Each player cannot forge keys while they have more forged keys than their opponent.
    amber: () => 1,
    staticEffect: (state, config) => {
        if (friendlyPlayer(state, config.thisCard).keys > enemyPlayer(state, config.thisCard).keys) {
            //TODO Cannot forge effect
        }
    }
}

cardScripts.scripts.set("heart-of-the-forest", cardScript)