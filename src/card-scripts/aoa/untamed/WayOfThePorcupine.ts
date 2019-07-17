import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    amber: () => 1,
    hazardous: () => true,

}

cardScripts.scripts.set("way-of-the-porcupine", cardScript)