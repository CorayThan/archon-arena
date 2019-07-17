import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 4,
    armor: () => 1,
    deploy: () => true,

}

cardScripts.scripts.set("lion-bautrem", cardScript)