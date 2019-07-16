import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 5,
    armor: () => 1,

}

cardScripts.scripts.set("barrister-joya", cardScript)