import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 3,
    hazardous: () => true,

}

cardScripts.scripts.set("aemberspine-mongrel", cardScript)