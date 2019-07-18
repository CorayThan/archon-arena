import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Knoxx gets +3 power for each neighbor it has.
    power: () => 3,

}

cardScripts.scripts.set("knoxx", cardScript)