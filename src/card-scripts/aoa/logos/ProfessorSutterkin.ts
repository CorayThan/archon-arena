import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 2,
    reap: {
        perform: (state, config) => {
            //Add reap code here
        }
    },

}

cardScripts.scripts.set("professor-sutterkin", cardScript)