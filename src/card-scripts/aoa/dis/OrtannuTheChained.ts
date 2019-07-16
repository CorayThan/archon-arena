import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 7,
    onReap: {
        perform: (state, config) => {
            //Add onReap code here
        }
    },

}

cardScripts.scripts.set("ortannu-the-chained", cardScript)