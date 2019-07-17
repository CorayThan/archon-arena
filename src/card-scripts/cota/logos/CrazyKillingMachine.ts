import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    action: {
        perform: (state, config) => {
            //Add action code here
        }
    },

}

cardScripts.scripts.set("crazy-killing-machine", cardScript)