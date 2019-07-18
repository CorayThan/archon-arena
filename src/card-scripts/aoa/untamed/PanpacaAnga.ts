import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Creatures to the right of Panpaca, Anga in the battleline get +2 power.
    power: () => 5,

}

cardScripts.scripts.set("panpaca-anga", cardScript)