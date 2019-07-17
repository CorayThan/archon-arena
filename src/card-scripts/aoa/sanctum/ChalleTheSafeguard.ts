import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    power: () => 4,
    armor: () => 2,
    deploy: () => true,
    taunt: () => true,

}

cardScripts.scripts.set("challe-the-safeguard", cardScript)