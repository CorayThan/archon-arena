import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    runAfterAnyActionThisTurn: {
        perform: (state, config) => {
            //TODO if action = friendly creature fights
        }
    }
}

cardScripts.scripts.set("warsong", cardScript)
