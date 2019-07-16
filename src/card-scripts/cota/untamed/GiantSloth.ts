import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 6,
    onAction: {
        perform: (state, config) => {
            //Add onAction code here
        }
    },

}

cardScripts.scripts.set("giant-sloth", cardScript)