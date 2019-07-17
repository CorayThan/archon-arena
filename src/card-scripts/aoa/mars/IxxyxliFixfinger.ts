import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    power: () => 2,
    armor: () => 2,
    elusive: () => true,

}

cardScripts.scripts.set("ixxyxli-fixfinger", cardScript)