import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {activePlayerState, enemyCreatureDiedThisTurn} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    reap: {
        perform: (state) => {
            if (enemyCreatureDiedThisTurn(state))
            	activePlayerState(state).amber++
        }
    }
}

cardScripts.scripts.set("foozle", cardScript)