import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    amber: () => 1,
    onOmni: {
        perform: (state, config) => {
            //Add onOmni code here
        }
    },

}

cardScripts.scripts.set("mighty-javelin", cardScript)