import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Assault 3. (Before this creature attacks, deal 3D to the attacked enemy.)
    // Hazardous 3. (Before this creature is attacked, deal 3D to the attacking enemy.)
    power: () => 3,
    hazardous: () => 3
}

cardScripts.scripts.set("fanghouse", cardScript)