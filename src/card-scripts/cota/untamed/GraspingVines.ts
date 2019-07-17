import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {allArtifacts, putInHand} from "../../types/ScriptUtils"
import {Artifact} from "../../../shared/gamestate/Artifact"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: allArtifacts,
        perform: (state, config) => {
            const targetedArtifact = config.targets[0] as Artifact
            putInHand(targetedArtifact)
        }
    }
}

cardScripts.scripts.set("grasping-vines", cardScript)