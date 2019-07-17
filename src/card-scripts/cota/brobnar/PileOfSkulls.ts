import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    runAfterAnyAction: {
        perform: (state, config) => {
            //if action = enemy creature is destroyed
            //TODO
        }
    }
}

cardScripts.scripts.set("pile-of-skulls", cardScript)
