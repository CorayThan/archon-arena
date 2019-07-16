import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 2,
    hazardous: () => 5
}

cardScripts.scripts.set("briar-grubbling", cardScript)