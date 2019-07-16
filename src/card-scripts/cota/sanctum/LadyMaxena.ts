import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 5,
    armor: () => 2,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },
    onAction: {
        perform: (state, config) => {
            //Add onAction code here
        }
    },

}

cardScripts.scripts.set("lady-maxena", cardScript)