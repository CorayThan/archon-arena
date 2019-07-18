import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Creatures not on a flank cannot fight this creature.
    amber: () => 1,

}

cardScripts.scripts.set("camouflage", cardScript)