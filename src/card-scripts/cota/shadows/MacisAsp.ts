import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 3,
    skirmish: () => true,
    poison: () => true,

}

cardScripts.scripts.set("macis-asp", cardScript)