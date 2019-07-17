import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    amber: () => 1,
    fight: {
        perform: (state, config) => {
            //Add onDestroyed code here
        }
    },

}

cardScripts.scripts.set("biomatrix-backup", cardScript)