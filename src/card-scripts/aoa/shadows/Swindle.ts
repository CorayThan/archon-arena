import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    alpha: () => true,
    omega: () => true,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },

}

cardScripts.scripts.set("swindle", cardScript)