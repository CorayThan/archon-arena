import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    power: () => 2,
    armor: () => 1,

}

cardScripts.scripts.set("nyzyk-resonator", cardScript)