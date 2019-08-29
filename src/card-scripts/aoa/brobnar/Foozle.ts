import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {activePlayerState, enemyCreatureDiedThisTurn, modifyAmber} from "../../ScriptUtils"

const cardScript: CardScript = {
    reap: {
        perform: (state: GameState) => {
            if (enemyCreatureDiedThisTurn(state))
                modifyAmber(activePlayerState(state), 1)
        }
    }
}

cardScripts.scripts.set("foozle", cardScript)
