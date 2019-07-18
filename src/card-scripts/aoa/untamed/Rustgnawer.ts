import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Fight: Destroy an artifact. If that artifact had an Æmber bonus, you gain that much A.
    power: () => 4,
    fight: {
        perform: (state, config) => {
            //Add fight code here
        }
    },

}

cardScripts.scripts.set("rustgnawer", cardScript)