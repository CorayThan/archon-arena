import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    power: () => 3,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },
    destroyed: {
        perform: (state, config) => {
            //Add destroyed code here
        }
    },

}

cardScripts.scripts.set("dextre", cardScript)