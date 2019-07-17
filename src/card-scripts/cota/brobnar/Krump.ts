import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import {allCreatures, destroyCard} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 6,
    onAnyFight: {
        perform: (state, config) => {
            //TODO if destroyed target in a fight
        }
    }
}

cardScripts.scripts.set("krump", cardScript)