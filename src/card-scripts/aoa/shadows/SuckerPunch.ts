import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { dealDamage, enemyCreatures, putInArchives } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Alpha. (You can only play this card before doing anything else this step.)
    // Play: Deal 2D to an enemy creature. If that creature is destroyed by this effect, archive Sucker Punch.
    amber: () => 1,
    alpha: () => true,
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const destroyedCards = dealDamage(config.targets as Creature[], 2)
            if (destroyedCards.length > 0) {
                putInArchives(state, [config.thisCard], true)
            }
        }
    }
}
cardScripts.scripts.set("sucker-punch", cardScript)