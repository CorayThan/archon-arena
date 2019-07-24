import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { allCreatures, destroyCard } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 6,
    onAnyFight: {
        perform: (state, config) => {
            //TODO if destroyed target in a fight
        }
    }
}

cardScripts.scripts.set("krump", cardScript)
