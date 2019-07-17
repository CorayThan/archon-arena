import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 4,
    action: {
        perform: (state, config) => {
            //Add action code here
        }
    },

}

cardScripts.scripts.set("novu-archaeologist", cardScript)