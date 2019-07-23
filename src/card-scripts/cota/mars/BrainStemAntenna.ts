import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // This creature gains, “After you play a Mars creature, ready this creature and for the remainder of the turn it belongs to house Mars.”
    staticEffect: (state, config) => {
        //TODO
    }
}

cardScripts.scripts.set("brain-stem-antenna", cardScript)