import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 4,
    skirmish: () => true,

}

cardScripts.scripts.set("snufflegator", cardScript)