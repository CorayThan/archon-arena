import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { captureAmber, inactivePlayerState } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: If your opponent has 7 or more <A>, capture all but 5 of it.
    power: () => 5,
    armor: () => 1,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            const enemyAmber = inactivePlayerState(state).amber
            if (enemyAmber > 7) {
                captureAmber(state, config.thisCard as Creature, enemyAmber - 5)
            }
        }
    }
}

cardScripts.scripts.set("gatekeeper", cardScript)