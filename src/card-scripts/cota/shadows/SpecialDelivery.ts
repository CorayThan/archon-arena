import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    amber: () => 1,
    omni: {
        perform: (state, config) => {
            //Add omni code here
        }
    },

}

cardScripts.scripts.set("special-delivery", cardScript)