import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyPlayer } from "../../ScriptUtils"

//TODO i'm not sure if this triggered will work like this
let triggered = false

const cardScript: CardScript = {
    // Action: Keys cost +3<A> during your opponent’s next turn.
    atStartOfYourTurn: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (triggered) {
                enemyPlayer(state, config.thisCard).keyCost -= 3
                triggered = false
            }
        }
    },
    action: {
        perform: (state: GameState, config: CardActionConfig) => {
            enemyPlayer(state, config.thisCard).keyCost += 3
            triggered = true
        }
    }
}
cardScripts.scripts.set("lash-of-broken-dreams", cardScript)