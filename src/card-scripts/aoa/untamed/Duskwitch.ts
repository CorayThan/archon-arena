import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    // Omega. (After you play this card, end this step.)
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
    // Your creatures enter play ready.
    power: () => 1,
    elusive: () => true,
    omega: () => true,
    staticEffect: () => {
        //TODO friendly creatures enter ready
    }
}

cardScripts.scripts.set("duskwitch", cardScript)