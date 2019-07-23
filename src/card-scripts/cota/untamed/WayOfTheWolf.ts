import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    amber: () => 1,
    staticEffect: (state, config) => {
        //TODO During each turn in which Untamed is not your active house, you may play one Untamed card.
    }
}

cardScripts.scripts.set("way-of-the-wolf", cardScript)