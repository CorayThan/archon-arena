import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Taunt. (This creature’s neighbors cannot be attacked unless they have taunt.)
    power: () => 6,
    armor: () => 1,
    taunt: () => true
}

cardScripts.scripts.set("champion-anaphiel", cardScript)