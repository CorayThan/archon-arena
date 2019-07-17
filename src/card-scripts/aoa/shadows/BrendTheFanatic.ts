import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 3,
    skirmish: () => true,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },
    fight: {
        perform: (state, config) => {
            //Add onDestroyed code here
        }
    },

}

cardScripts.scripts.set("brend-the-fanatic", cardScript)