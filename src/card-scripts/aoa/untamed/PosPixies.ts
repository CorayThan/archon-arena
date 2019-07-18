import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
    // A stolen or captured from your pool is taken from the common supply instead.
    power: () => 1,
    elusive: () => true,
    staticEffect: () => {
        //TODO redirect or re-add steal/capture amber
    }
}

cardScripts.scripts.set("pos-pixies", cardScript)