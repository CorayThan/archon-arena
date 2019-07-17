import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 1,
    fight: {
        perform: (state, config) => {
            //Add onDestroyed code here
        }
    },

}

cardScripts.scripts.set("bad-penny", cardScript)