import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 3,
    onReap: {
        perform: (state, config) => {
            //Add onReap code here
        }
    },

}

cardScripts.scripts.set("commander-remiel", cardScript)