import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Action: Choose a creature. For the remainder of the turn, that creature loses taunt and elusive.
    //
    amber: () => 1,
    action: {
        perform: (state, config) => {
            //Add action code here
        }
    },

}

cardScripts.scripts.set("niffle-grounds", cardScript)