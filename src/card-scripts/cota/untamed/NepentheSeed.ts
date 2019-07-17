import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    omni: {
        perform: (state, config) => {
            //Add omni code here
        }
    },

}

cardScripts.scripts.set("nepenthe-seed", cardScript)