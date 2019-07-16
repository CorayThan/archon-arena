import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 6,
    armor: () => 1,

}

cardScripts.scripts.set("baron-mengevin", cardScript)