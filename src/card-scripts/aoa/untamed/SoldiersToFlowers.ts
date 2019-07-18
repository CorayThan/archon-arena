import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Play: Purge each Untamed creature from each player’s discard pile. For each card purged this way, its owner gains 1A.
    amber: () => 1,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },

}

cardScripts.scripts.set("soldiers-to-flowers", cardScript)