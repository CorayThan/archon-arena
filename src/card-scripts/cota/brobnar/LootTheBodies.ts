import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    runAfterAnyActionThisTurn: {
        perform: (state, config) => {
            //TODO if action = enemy creature destroyed
        }
    }
}

cardScripts.scripts.set("loot-the-bodies", cardScript)
