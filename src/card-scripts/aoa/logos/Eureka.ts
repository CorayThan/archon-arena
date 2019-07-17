import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    amber: () => 1,
    alpha: () => true,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },

}

cardScripts.scripts.set("eureka", cardScript)