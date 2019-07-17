import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 2,
    destroyed: {
        perform: (state, config) => {
            //Add destroyed code here
        }
    },

}

cardScripts.scripts.set("dust-imp", cardScript)