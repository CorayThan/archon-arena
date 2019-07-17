import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    power: () => 3,
    armor: () => 1,

}

cardScripts.scripts.set("zysysyx-shockworm", cardScript)