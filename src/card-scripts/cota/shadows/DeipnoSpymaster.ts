import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 1,
    elusive: () => true,
    onOmni: {
        perform: (state, config) => {
            //Add onOmni code here
        }
    },

}

cardScripts.scripts.set("deipno-spymaster", cardScript)