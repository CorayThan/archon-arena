import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Play: Choose a house. Exhaust each enemy creature of the chosen house.
    //
    amber: () => 1,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },

}

cardScripts.scripts.set("persistence-hunting", cardScript)