import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allArtifacts, destroyCards} from "../../ScriptUtils"

const cardScript: CardScript = {
    // Omni: Sacrifice Gorm of Omm. Destroy an artifact.
    omni: {
        validTargets: allArtifacts,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            destroyCards(state, config.targets)
        }
    }
}

cardScripts.scripts.set("gorm-of-omm", cardScript)