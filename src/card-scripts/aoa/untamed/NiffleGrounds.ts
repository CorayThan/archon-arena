import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {allCreatures} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Action: Choose a creature. For the remainder of the turn, that creature loses taunt and elusive.
    amber: () => 1,
    action: {
        //TODO save the target creatures and original state of taunt/elusive
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            config.targets.forEach(creature => {
                (creature as Creature).taunt = false
                (creature as Creature).elusive = false
            })
        }
    },
    atEndOfYourTurn: {
        perform: (state, config) => {
            config.targets.forEach(creature => {
                (creature as Creature).taunt = true
                (creature as Creature).elusive = true
            })
        }
    }

}

cardScripts.scripts.set("niffle-grounds", cardScript)