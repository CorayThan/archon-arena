import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },
    omni: {
        perform: (state, config) => {
            //Add omni code here
        }
    },

}

cardScripts.scripts.set("masterplan", cardScript)