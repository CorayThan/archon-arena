import {cardScripts} from "../../types/CardScripts"
import {CardScript} from "../../types/CardScript"

const cardScript: CardScript = {
    power: () => 3,
    elusive: () => true,
    skirmish: () => true


}

cardScripts.scripts.set("KnucklesBolton", cardScript)