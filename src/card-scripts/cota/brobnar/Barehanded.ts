import {cardScripts} from "../../types/CardScripts"
import {CardScript} from "../../types/CardScript"
import {allArtifacts, putOnTopOfDeck} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: allArtifacts,
        numberOfTargets: (state) => {
            return allArtifacts(state).length
        },
        uniqueTargets: () => true,
        chosenTargetsAreValid: (targets, state) => {
            return targets.length === allArtifacts(state).length
        },
        perform: (state, config) => {
            config.targets.forEach(artifact => putOnTopOfDeck(artifact))
        },
    }
}

cardScripts.scripts.set("barehanded", cardScript)