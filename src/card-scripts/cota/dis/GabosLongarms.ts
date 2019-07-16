import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 5,
    onFight: {
        perform: (state, config) => {
            //Add onFight code here
        }
    },
    onBeforeFight: {
        perform: (state, config) => {
            //Add onBeforeFight code here
        }
    },

}

cardScripts.scripts.set("gabos-longarms", cardScript)