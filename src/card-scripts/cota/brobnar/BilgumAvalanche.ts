import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, dealDamage, enemyCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 5,
    onKeyForge: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (activePlayerState(state).player.id === config.thisCard.ownerId) {
                dealDamage(enemyCreatures(state), 2)
            }
        }
    }
}

cardScripts.scripts.set("bilgum-avalanche", cardScript)
