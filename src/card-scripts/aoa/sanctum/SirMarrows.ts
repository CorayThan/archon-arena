import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { captureAmber, enemyPlayer, modifyAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // After your opponent gains A by reaping, Sir Marrows captures it.
    power: () => 4,
    armor: () => 2,
    onAnyReap: {
        perform: (state: GameState, config: CardActionConfig) => {
            const enemyPlayerState = enemyPlayer(state, config.thisCard)
            if (enemyPlayerState.creatures.some(x => x.id === config.triggerCard.id)) {
                captureAmber(state, config.thisCard as Creature, 1)
                modifyAmber(enemyPlayerState, -1)
            }
        }
    }
}

cardScripts.scripts.set("sir-marrows", cardScript)