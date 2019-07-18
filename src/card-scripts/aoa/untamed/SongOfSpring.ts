import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Play: Shuffle any number of friendly Untamed creatures from your hand, discard pile, or battleline back into your deck.
    amber: () => 1,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },

}

cardScripts.scripts.set("song-of-spring", cardScript)