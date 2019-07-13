import { cardScripts } from "../../types/CardScripts"
import { CardScript, TargetType, TargetArea } from "../../types/CardScript"
import { Creature } from "../../../shared/gamestate/Creature"
import { checkIfHasTargets, putOnTopOfDeck } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () =>  1,
    onPlay: {
        perform: (state, config) => {
            if (checkIfHasTargets(config, 1)) {
                const targetedArtifacts = config.targets
                targetedArtifacts.forEach(artifact => putOnTopOfDeck(artifact))
            }
        },
        targetOrder: [{
            areas: [TargetArea.BOARD],
            types: [TargetType.ARTIFACT]
        }]
        //Don't know how to tell it to 'select all possible targets'
    }
}

cardScripts.scripts.set("barehanded", cardScript)