import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 3,
    armor: () => 1,

}

cardScripts.scripts.set("zysysyx-shockworm", cardScript)