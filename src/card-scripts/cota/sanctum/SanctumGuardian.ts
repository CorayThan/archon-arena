import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 6,
    armor: () => 1,
    taunt: () => true,
    reap: {
        perform: (state, config) => {
            //Add reap code here
        }
    },
    fight: {
        perform: (state, config) => {
            //Add fight code here
        }
    },

}

cardScripts.scripts.set("sanctum-guardian", cardScript)