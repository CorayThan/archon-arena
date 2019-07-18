import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Each player cannot forge keys while they have more forged keys than their opponent.
    amber: () => 1,

}

cardScripts.scripts.set("heart-of-the-forest", cardScript)