import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },
    onOmni: {
        perform: (state, config) => {
            //Add onOmni code here
        }
    },

}

cardScripts.scripts.set("masterplan", cardScript)