import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyPlayer, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) 
    // Each time a creature is destroyed, its opponent gains 1<A>.
    power: () => 1,
    elusive: () => true,
    onCreatureDestroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            modifyAmber(enemyPlayer(state, config.triggerCard), 1)
        }
    }
}
cardScripts.scripts.set("tolas", cardScript)