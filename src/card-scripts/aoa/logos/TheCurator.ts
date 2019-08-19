import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Friendly artifacts enter play ready.
    power: () => 3,
    //TODO static effect to enter ready
}
cardScripts.scripts.set("the-curator", cardScript)