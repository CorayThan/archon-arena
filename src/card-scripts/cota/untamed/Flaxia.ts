import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {activePlayerState, enemyCreatures, friendlyCreatures} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 4,
    onPlay: {
        perform: (state) => {
            if (friendlyCreatures.length >= enemyCreatures.length) {
                activePlayerState(state).amber += 2
            }
        }
    }
}

cardScripts.scripts.set("flaxia", cardScript)