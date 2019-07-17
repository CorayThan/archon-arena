import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    power: () => 2,
    elusive: () => true,
    omega: () => true,
    deploy: () => true,

}

cardScripts.scripts.set("little-niff", cardScript)