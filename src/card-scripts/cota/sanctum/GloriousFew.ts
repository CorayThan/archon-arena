import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, enemyCreatures, friendlyCreatures, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: For each creature your opponent controls in excess of you, gain 1<A>.
    onPlay: {
        perform: (state) => {
            const excess = enemyCreatures(state).length - friendlyCreatures(state).length
            if (excess > 0) modifyAmber(activePlayerState(state), excess)
        }
    }
}

cardScripts.scripts.set("glorious-few", cardScript)