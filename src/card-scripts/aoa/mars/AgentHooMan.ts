import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 2,
    elusive: () => true,
    reap: {
        perform: (state, config) => {
            //Add reap code here
        }
    },

}

cardScripts.scripts.set("agent-hoo-man", cardScript)