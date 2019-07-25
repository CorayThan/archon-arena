import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { captureAmber, enemyPlayer } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Your opponent’s keys cost +1<A>.
    // Fight/Reap: Capture 1<A>.
    power: () => 4,
    armor: () => 1,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        enemyPlayer(state, config.thisCard).keyCost += 2
    },
    reap: {
        perform: (state: GameState, config: CardActionConfig) => {
            captureAmber(state, config.thisCard as Creature, 1)
        }
    },
    fight: {
        perform: (state: GameState, config: CardActionConfig) => {
            captureAmber(state, config.thisCard as Creature, 1)
        }
    }
}

cardScripts.scripts.set("grabber-jammer", cardScript)