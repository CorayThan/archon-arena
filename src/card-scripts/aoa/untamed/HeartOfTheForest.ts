import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyPlayer, friendlyPlayer } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Each player cannot forge keys while they have more forged keys than their opponent.
    amber: () => 1,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        if (friendlyPlayer(state, config.thisCard).keys > enemyPlayer(state, config.thisCard).keys) {
            //TODO Cannot forge effect
        }
    }
}

cardScripts.scripts.set("heart-of-the-forest", cardScript)