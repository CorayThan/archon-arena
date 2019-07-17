import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    power: () => 7,
    runAfterAnyAction: {
        perform: (state, config) => {
            //check if action is creature entering board
        }
    }
}

//cardScripts.scripts.set("bellowing-patriazate", cardScript)