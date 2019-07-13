import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { inactivePlayerState } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    runAfterAnyAction: {
        perform: (state) => {
            //if action = creature enters board
            //deal 1 to creature
            //need to be able to sequence properly with Play abilities...
            //TODO
        }
    }
}

cardScripts.scripts.set("autocannon", cardScript)