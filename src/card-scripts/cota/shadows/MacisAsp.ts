import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    power: () => 3,
    skirmish: () => true,
    poison: () => true,

}

cardScripts.scripts.set("macis-asp", cardScript)