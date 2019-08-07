import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { alterPower, enemyPlayer } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    power: () => 2,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        alterPower([config.thisCard] as Creature[], (3 * (3 - enemyPlayer(state, config.thisCard).keys)))
    }
}

cardScripts.scripts.set("mushroom-man", cardScript)