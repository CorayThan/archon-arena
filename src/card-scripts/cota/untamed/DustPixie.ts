import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    amber: () => 2,
    power: () => 1,

}

cardScripts.scripts.set("dust-pixie", cardScript)