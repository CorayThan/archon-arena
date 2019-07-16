import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 2,
    elusive: () => true,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },
    onFight: {
        perform: (state, config) => {
            //Add onDestroyed code here
        }
    },

}

cardScripts.scripts.set("jargogle", cardScript)