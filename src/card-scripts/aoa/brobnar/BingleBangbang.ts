import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    power: () => 2,
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

cardScripts.scripts.set("bingle-bangbang", cardScript)