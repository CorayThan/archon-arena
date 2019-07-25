import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, enemyCreatureDiedThisTurn } from "../../ScriptUtils"

const cardScript: CardScript = {
    reap: {
        perform: (state: GameState) => {
            if (enemyCreatureDiedThisTurn(state))
                activePlayerState(state).amber++
        }
    }
}

cardScripts.scripts.set("foozle", cardScript)
