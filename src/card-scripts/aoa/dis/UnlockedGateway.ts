import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    omega: () => true,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },

}

cardScripts.scripts.set("unlocked-gateway", cardScript)