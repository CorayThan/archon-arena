import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    power: () => 3,
    elusive: () => true,

}

cardScripts.scripts.set("director-of-z-y-x", cardScript)