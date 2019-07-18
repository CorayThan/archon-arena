import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // At the end of your turn, give each neighboring creature a +1 power counter.
    power: () => 3,

}

cardScripts.scripts.set("grovekeeper", cardScript)