import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Play: For the remainder of the turn, each friendly creature cannot be dealt damage.
    amber: () => 1,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
            //TODO no damage during turn
        }
    },

}

cardScripts.scripts.set("shield-of-justice", cardScript)