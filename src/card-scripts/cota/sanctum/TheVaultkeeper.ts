import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Your <A> cannot be stolen.
    power: () => 4,
    armor: () => 1,
    staticEffect: () => {
        //TODO AMBER CANNOT BE STOLEN
    }
}

cardScripts.scripts.set("the-vaultkeeper", cardScript)