import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 2,
    armor: () => 1,

}

cardScripts.scripts.set("nyzyk-resonator", cardScript)