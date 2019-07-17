import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    amber: () => 1,
    destroyed: {
        perform: (state, config) => {
            //Add destroyed code here
        }
    },

}

cardScripts.scripts.set("biomatrix-backup", cardScript)