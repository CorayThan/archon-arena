import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { allArtifacts, putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: allArtifacts,
        perform: (state, config) => {
            putInHand(state, config.targets)
        }
    }
}

cardScripts.scripts.set("grasping-vines", cardScript)