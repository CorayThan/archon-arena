import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    power: () => 6,
    elusive: () => true
}

cardScripts.scripts.set("culf-the-quiet", cardScript)