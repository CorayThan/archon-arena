import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
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