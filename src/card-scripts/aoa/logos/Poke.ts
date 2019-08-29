import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, dealDamage, drawCards, enemyCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Deal 1D to an enemy creature. If this damage destroys that creature, draw a card.
    amber: () => 1,
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const destroyed = dealDamage(config.targets as Creature[], 1)
            if (destroyed.length > 0) {
                drawCards(activePlayerState(state), 1)
            }
        }
    }
}
cardScripts.scripts.set("poke", cardScript)