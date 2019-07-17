import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    power: () => 4,
    armor: () => 2,
    hazardous: () => true,
    taunt: () => true,

}

cardScripts.scripts.set("rothais-the-fierce", cardScript)