import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Play: Deal 2D to each enemy flank creature. Deal 1D to each enemy creature not on a flank.
    amber: () => 1,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },

}

cardScripts.scripts.set("theyre-everywhere", cardScript)