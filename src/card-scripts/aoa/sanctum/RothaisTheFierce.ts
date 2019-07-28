import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Taunt. (This creature’s neighbors cannot be attacked unless they have taunt.) ]
    // Hazardous 4. (Before this creature is attacked, deal 4D to the attacking enemy.)
    power: () => 4,
    armor: () => 2,
    hazardous: () => 0,
    taunt: () => true
}

cardScripts.scripts.set("rothais-the-fierce", cardScript)