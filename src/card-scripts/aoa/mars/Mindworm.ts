import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    power: () => 1,
    elusive: () => true,
    fight: {
        perform: (state, config) => {
            //Add fight code here
        }
    },
    beforeFight: {
        perform: (state, config) => {
            //Add beforeFight code here
        }
    },

}

cardScripts.scripts.set("mindworm", cardScript)