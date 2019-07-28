import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    power: () => 2,
    hazardous: () => 5
}

cardScripts.scripts.set("briar-grubbling", cardScript)