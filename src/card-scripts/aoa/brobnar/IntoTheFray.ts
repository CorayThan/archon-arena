import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },
    onFight: {
        perform: (state, config) => {
            //Add onFight code here
        }
    },

}

cardScripts.scripts.set("into-the-fray", cardScript)