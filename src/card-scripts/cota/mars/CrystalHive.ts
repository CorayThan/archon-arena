import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Action: For the remainder of the turn, gain 1<A> each time a creature reaps.
    //TODO setup staticEffect to trigger on reap of other creatures
    // action: {
    //     perform: (state, config) => {
    //
    //     }
    // },

}

cardScripts.scripts.set("crystal-hive", cardScript)