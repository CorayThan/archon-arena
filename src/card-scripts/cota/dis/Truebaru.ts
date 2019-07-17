import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 7,
    taunt: () => true,
    destroyed: {
        perform: (state, config) => {
            //Add destroyed code here
        }
    },

}

cardScripts.scripts.set("truebaru", cardScript)