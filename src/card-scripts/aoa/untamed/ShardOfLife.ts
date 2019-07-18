import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Action: Shuffle a card from your discard pile into your deck for each friendly Shard.
    //
    action: {
        perform: (state, config) => {
            //Add action code here
        }
    },

}

cardScripts.scripts.set("shard-of-life", cardScript)