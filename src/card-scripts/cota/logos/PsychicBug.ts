import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    amber: () => 1,
    power: () => 2,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },
    onReap: {
        perform: (state, config) => {
            //Add onReap code here
        }
    },

}

cardScripts.scripts.set("psychic-bug", cardScript)