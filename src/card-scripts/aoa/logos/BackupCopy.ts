import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    amber: () => 1,
    destroyed: {
        perform: (state, config) => {
            //Add destoryed code here
        }
    },

}

cardScripts.scripts.set("backup-copy", cardScript)