import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { enemyCreatureDiedThisTurn, activePlayerState } from "../../ScriptUtils"

const cardScript: CardScript = {
    reap: {
        perform: (state) => {
            if (enemyCreatureDiedThisTurn(state))
            	activePlayerState(state).amber++
        }
    }
}

cardScripts.scripts.set("foozle", cardScript)
