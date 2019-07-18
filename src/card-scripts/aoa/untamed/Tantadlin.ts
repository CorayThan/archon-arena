import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Tantadlin only deals 2D when fighting.
    // Fight: Discard a random card from your opponent’s archives.
    power: () => 9,
    fight: {
        perform: (state, config) => {
            //Add fight code here
        }
    },

}

cardScripts.scripts.set("tantadlin", cardScript)