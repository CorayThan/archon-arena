import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    power: () => 5,
    armor: () => 1,

}

cardScripts.scripts.set("barrister-joya", cardScript)