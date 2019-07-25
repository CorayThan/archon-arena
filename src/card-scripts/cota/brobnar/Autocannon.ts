import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    runAfterAnyAction: {
        perform: (state: GameState, config: CardActionConfig) => {
            //if action = creature enters board
            //deal 1 to creature
            //need to be able to sequence properly with Play abilities...
            //TODO
        }
    }
}

cardScripts.scripts.set("autocannon", cardScript)
