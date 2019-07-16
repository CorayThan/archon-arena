import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    amber: () => 1,
    power: () => 2,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },
    onAction: {
        perform: (state, config) => {
            //Add onAction code here
        }
    },

}

cardScripts.scripts.set("timetraveller", cardScript)