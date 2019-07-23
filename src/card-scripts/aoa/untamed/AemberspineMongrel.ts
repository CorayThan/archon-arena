import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Hazardous 3. (Before this creature is attacked, deal 3D to the attacking enemy.)
    // After your opponent uses a creature to reap, gain 1A.
    power: () => 3,
    hazardous: () => 3,
    staticEffect: () => {
        //TODO if action; enemy reaping
    }
}

cardScripts.scripts.set("aemberspine-mongrel", cardScript)