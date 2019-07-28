import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyPlayer } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    power: () => 2,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        (config.thisCard as Creature).tokens.power = (config.thisCard as Creature).tokens.power + (3 * (3 - enemyPlayer(state, config.thisCard).keys))
    }
}

cardScripts.scripts.set("mushroom-man", cardScript)