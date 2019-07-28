import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyPlayer } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 3,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        enemyPlayer(state, config!.thisCard).keyCost += 1
    }
}

cardScripts.scripts.set("murmook", cardScript)