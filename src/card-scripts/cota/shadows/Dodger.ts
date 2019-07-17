import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 5,
    fight: {
        perform: (state, config) => {
            //Add fight code here
        }
    },

}

cardScripts.scripts.set("dodger", cardScript)