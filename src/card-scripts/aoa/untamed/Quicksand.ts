import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Play: Destroy the most powerful creature controlled by each player who does not control a ready Untamed creature.
    amber: () => 1,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },

}

cardScripts.scripts.set("quicksand", cardScript)