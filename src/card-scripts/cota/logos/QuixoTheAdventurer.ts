import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 3,
    skirmish: () => true,
    onFight: {
        perform: (state, config) => {
            //Add onFight code here
        }
    },

}

cardScripts.scripts.set("quixo-the-adventurer", cardScript)