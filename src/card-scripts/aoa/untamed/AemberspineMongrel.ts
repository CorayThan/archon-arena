import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyPlayer, friendlyPlayer, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Hazardous 3. (Before this creature is attacked, deal 3D to the attacking enemy.)
    // After your opponent uses a creature to reap, gain 1A.
    power: () => 3,
    hazardous: () => 3,
    onAnyReap: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (enemyPlayer(state, config.thisCard).creatures
                .some(x => x.id === config.triggerCard.id)) {
                modifyAmber(friendlyPlayer(state, config.thisCard), 1)
            }
        }
    }
}

cardScripts.scripts.set("aemberspine-mongrel", cardScript)