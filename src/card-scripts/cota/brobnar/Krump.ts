import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {enemyPlayer, modifyAmber} from "../../ScriptUtils";

const cardScript: CardScript = {
    power: () => 6,
    onDestroyedEnemyInFight: {
        perform: (state: GameState, config: CardActionConfig) => {
            modifyAmber(enemyPlayer(state, config.thisCard), 1)
        }
    }
}

cardScripts.scripts.set("krump", cardScript)
