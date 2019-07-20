import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, destroyCard, friendlyCreatures} from "../../ScriptUtils"

import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: friendlyCreatures,
        numberOfTargets: (state) => {
            return friendlyCreatures(state).length
        },
        upToTargets: () => true,
        chosenTargetsAreValid: (targets) => {
            let combinedPower = 0
            targets.forEach(creature => combinedPower += (creature as Creature).power)
            return combinedPower >= 25
        },
        perform: (state, config) => {
            let destroyedPower = 0
            config.targets.forEach(creature => {
                if (destroyCard(creature))
                    destroyedPower += (creature as Creature).power
            })
            if (destroyedPower >= 25)
                activePlayerState(state).keys += 1
        }
    }
}

cardScripts.scripts.set("might-makes-right", cardScript)