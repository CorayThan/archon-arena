import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyPlayer } from "../../ScriptUtils"

const cardScript: CardScript = {
    // During their “draw cards” step, your opponent refills their hand to 1 less card.
    power: () => 3,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        enemyPlayer(state, config.thisCard).handSize -= 1
    }
}
cardScripts.scripts.set("succubus", cardScript)