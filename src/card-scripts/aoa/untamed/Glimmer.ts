import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Alpha. (You can only play this card before doing anything else this step.)
    // Play: Return a card from your discard pile to your hand.
    power: () => 1,
    alpha: () => true,
    onPlay: {
        perform: (state, config) => {
            //Add onPlay code here
        }
    },

}

cardScripts.scripts.set("glimmer", cardScript)