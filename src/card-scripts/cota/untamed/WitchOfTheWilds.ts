import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
    power: () => 4,
    staticEffect: (state, config) => {
        //TODO "During each turn in which Untamed is not your active house, you may play one Untamed card."
    }
}

cardScripts.scripts.set("witch-of-the-wilds", cardScript)