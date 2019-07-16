import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 4,
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
    onFight: {
        perform: (state, config) => {
            //Add onFight code here
        }
    },

}

cardScripts.scripts.set("guardian-demon", cardScript)