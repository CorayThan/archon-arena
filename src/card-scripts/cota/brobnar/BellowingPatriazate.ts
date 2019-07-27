import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    power: () => 7,
    runAfterAnyAction: {
        perform: (state: GameState, config: CardActionConfig) => {
            //check if action is creature entering board
        }
    }
}

cardScripts.scripts.set("bellowing-patriazate", cardScript)
