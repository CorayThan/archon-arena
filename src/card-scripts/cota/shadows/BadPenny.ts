import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 1,
    destroyed: {
        perform: (state, config) => {
            //Add destoryed code here
        }
    },

}

cardScripts.scripts.set("bad-penny", cardScript)