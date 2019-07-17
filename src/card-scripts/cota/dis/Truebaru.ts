import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 7,
    destroyed: {
        perform: (state, config) => {
            //Add destoryed code here
        }
    },

}

cardScripts.scripts.set("truebaru", cardScript)