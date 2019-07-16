import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 2,
    armor: () => 2,
    elusive: () => true,

}

cardScripts.scripts.set("ixxyxli-fixfinger", cardScript)