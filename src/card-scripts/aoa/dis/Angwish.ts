import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyPlayer } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // For each damage on Angwish, your opponent’s keys cost +1A.
    power: () => 6,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        enemyPlayer(state, config.thisCard).keyCost += (config.thisCard as Creature).tokens.damage
    }
}
cardScripts.scripts.set("angwish", cardScript)