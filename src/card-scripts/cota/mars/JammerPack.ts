import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyPlayer } from "../../ScriptUtils"

const cardScript: CardScript = {
    // This creature gains, “Your opponent's keys cost +2<A>.“
    amber: () => 1,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        enemyPlayer(state, config.thisCard).keyCost += 2
    }
}

cardScripts.scripts.set("jammer-pack", cardScript)