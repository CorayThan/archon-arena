import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 4,
    armor: () => 1,

}

cardScripts.scripts.set("the-vaultkeeper", cardScript)