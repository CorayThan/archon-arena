import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    power: () => 10,

}

cardScripts.scripts.set("grommid", cardScript)