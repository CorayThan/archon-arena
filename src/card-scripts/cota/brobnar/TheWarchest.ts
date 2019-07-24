import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, getNumberOfCreaturesDestroyedInAFight} from "../../ScriptUtils"

const cardScript: CardScript = {
    action: {
        perform: (state) => {
            activePlayerState(state).amber += getNumberOfCreaturesDestroyedInAFight(state)
        }
    }
}

cardScripts.scripts.set("the-warchest", cardScript)
