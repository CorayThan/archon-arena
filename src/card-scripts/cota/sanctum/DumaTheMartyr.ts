import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 3,
    destroyed: {
        perform: (state, config) => {
            //Add destroyed code here
        }
    },

}

cardScripts.scripts.set("duma-the-martyr", cardScript)