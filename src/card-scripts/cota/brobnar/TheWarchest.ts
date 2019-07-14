import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {activePlayerState, getNumberOfCreaturesDestroyedInAFight} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    action: {
        perform: (state) => {
            activePlayerState(state).amber += getNumberOfCreaturesDestroyedInAFight(state)
        }
    }
}

cardScripts.scripts.set("the-warchest", cardScript)