import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 9,
    armor: () => 1,
    taunt: () => true,

}

cardScripts.scripts.set("yxilx-dominator", cardScript)