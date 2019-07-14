import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { friendlyCreatures, enemyCreatures, activePlayerState } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state) => {
            if (friendlyCreatures(state).length > enemyCreatures(state).length)
                activePlayerState(state).amber += 2
        }
    }
}

cardScripts.scripts.set("smith", cardScript)