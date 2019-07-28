import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
//import { destroyCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // After this creature is used, destroy it.
    // onUse: (state, config) => {
    //     destroyCards(state,[config.thisCard])
    // }
}

cardScripts.scripts.set("containment-field", cardScript)