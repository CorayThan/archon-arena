import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    power: () => 5,
    assault: () => 2
}

cardScripts.scripts.set("ancient-bear", cardScript)