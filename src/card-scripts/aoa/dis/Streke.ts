import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyPlayer, isFlank } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
    // While Streke is not on a flank, your opponent refills their hand to 1 less card during their “draw cards” step.
    power: () => 2,
    elusive: () => true,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        if (!isFlank(state, config.thisCard as Creature)) {
            enemyPlayer(state, config.thisCard).handSize -= 1
        }
    }
}
cardScripts.scripts.set("streke", cardScript)