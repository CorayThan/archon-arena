import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {enemyCreatures, friendlyCreatures} from "../../ScriptUtils"


const cardScript: CardScript = {
    amber: (state) => {
        return friendlyCreatures(state).length > enemyCreatures(state).length ? 3 : 1
    }
}

cardScripts.scripts.set("smith", cardScript)