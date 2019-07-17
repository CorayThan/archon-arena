import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 5,
    armor: () => 2,
    fight: {
        perform: (state, config) => {
            //Add fight code here
        }
    },
    beforeFight: {
        perform: (state, config) => {
            //Add beforeFight code here
        }
    },

}

cardScripts.scripts.set("lord-golgotha", cardScript)