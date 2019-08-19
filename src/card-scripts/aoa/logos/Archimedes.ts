import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) Each of Archimedes’s neighbors gains, “Destroyed: Archive this creature.”
    power: () => 2,
    elusive: () => true,
    destroyed: {
        perform: () => {
            //TODO give effect
        }
    }
}
cardScripts.scripts.set("archimedes", cardScript)