import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Play: For the remainder of the turn, each time a friendly creature fights, it captures 1<A>.
    amber: () => 1,
    staticEffect: (state, config) => {
        //TODO on fight, capture
    }

}

cardScripts.scripts.set("take-hostages", cardScript)