import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 4,
    armor: () => 2,
    onFight: {
        perform: (state, config) => {
            //Add onFight code here
        }
    },

}

cardScripts.scripts.set("yxlyx-stimrager", cardScript)