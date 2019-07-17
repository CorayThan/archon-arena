import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import {friendlyCreatures, readyCreature, fightUsingCreature, getNeighbors} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 7,
    runAfterAnyAction: {
        perform: (state, config) => {
            //check if action is creature entering board
        }
    }
}

cardScripts.scripts.set("bellowing-patriazate", cardScript)