import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, destroyCards, friendlyCreatures, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Destroy any number of friendly creatures. Gain 1A for each creature destroyed this way.
    amber: () => 1,
    onPlay: {
        validTargets: friendlyCreatures,
        perform: (state, config) => {
            destroyCards(state, config.targets)
            modifyAmber(activePlayerState(state), config.targets.length)
        }
    }
}

cardScripts.scripts.set("martyrs-end", cardScript)