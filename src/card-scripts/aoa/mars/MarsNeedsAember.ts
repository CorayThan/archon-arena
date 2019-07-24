import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { enemyCreatures, inactivePlayerState, modifyAmber } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: Each damaged enemy non-Mars creature captures 1A from their own side.
    amber: () => 1,
    onPlay: {
        perform: (state) => {
            const targets = enemyCreatures(state)
                .filter(x => x.backingCard.house !== House.Mars && x.tokens.damage > 0)
            modifyAmber(inactivePlayerState(state), -targets.length)
            targets.forEach(x => x.tokens.amber++)
        }
    }
}

cardScripts.scripts.set("mars-needs-aember", cardScript)