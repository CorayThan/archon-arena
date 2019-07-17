import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 2,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },
    reap: {
        perform: (state, config) => {
            //Add reap code here
        }
    },
    fight: {
        perform: (state, config) => {
            //Add fight code here
        }
    },

}

cardScripts.scripts.set("the-grey-rider", cardScript)