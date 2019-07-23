import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { allCreatures, takeSkirmish, takeTaunt } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Action: Choose a creature. For the remainder of the turn, that creature loses taunt and elusive.
    amber: () => 1,
    action: {
        //TODO save the target creatures and original state of taunt/elusive
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            takeTaunt(config.targets as Creature[])
            takeSkirmish(config.targets as Creature[])
        }
    },
    // atEndOfYourTurn: {
    //     perform: (state, config) => {
    //
    //     }
    // }

}

cardScripts.scripts.set("niffle-grounds", cardScript)