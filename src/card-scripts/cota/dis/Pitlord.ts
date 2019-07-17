import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    amber: () => 2,
    power: () => 9,
    taunt: () => true,

}

cardScripts.scripts.set("pitlord", cardScript)