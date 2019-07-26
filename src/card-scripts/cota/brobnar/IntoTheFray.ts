import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    runAfterAnyActionThisTurn: {
        perform: (state, config) => {
            //TODO if action === fight
        }
    }
}

cardScripts.scripts.set("into-the-fray", cardScript)
