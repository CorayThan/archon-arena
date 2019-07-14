import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {enemyCreatures, friendlyCreatures} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: (state) => {
        return friendlyCreatures(state).length > enemyCreatures(state).length ? 3 : 1
    }
}

cardScripts.scripts.set("smith", cardScript)