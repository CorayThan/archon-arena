import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 6,
    armor: () => 1,
    onReap: {
        perform: (state, config) => {
            //Add onReap code here
        }
    },
    onFight: {
        perform: (state, config) => {
            //Add onFight code here
        }
    },

}

cardScripts.scripts.set("sanctum-guardian", cardScript)