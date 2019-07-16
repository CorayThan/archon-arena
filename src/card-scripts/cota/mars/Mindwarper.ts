import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 2,
    elusive: () => true,
    onAction: {
        perform: (state, config) => {
            //Add onAction code here
        }
    },

}

cardScripts.scripts.set("mindwarper", cardScript)