import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    power: () => 3,
    skirmish: () => true,

}

cardScripts.scripts.set("redlock", cardScript)