import { cardScripts } from "../../types/CardScripts"
import { CardScript, TargetType, TargetArea } from "../../types/CardScript"
import { Creature } from "../../../shared/gamestate/Creature"
import { allArtifacts, putOnTopOfDeck } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () =>  1,
    onPlay: {
        validTargets: allArtifacts,
        choosenTargetsAreValid: (targets) => {
            //TODO Can't check whether all artifacts have been selected...
            return targets.map(target => target.id)
            .sort((a, b) => a.localeCompare(b)).join(',') 
            === allArtifacts(state).map(target => target.id)
            .sort((a, b) => a.localeCompare(b)).join(',')
        },
        perform: (state, config) => {
            if (config.targets.length > 0) {
                const targetedArtifacts = config.targets
                targetedArtifacts.forEach(artifact => putOnTopOfDeck(artifact))
            }
        },
        
    }
}

cardScripts.scripts.set("barehanded", cardScript)