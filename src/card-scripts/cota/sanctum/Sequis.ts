import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 4,
    armor: () => 2,
    onReap: {
        perform: (state, config) => {
            //Add onReap code here
        }
    },

}

cardScripts.scripts.set("sequis", cardScript)