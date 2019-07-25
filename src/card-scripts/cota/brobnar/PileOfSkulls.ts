import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    runAfterAnyAction: {
        perform: (state: GameState, config: CardActionConfig) => {
            //if action = enemy creature is destroyed
            //TODO
        }
    }
}

cardScripts.scripts.set("pile-of-skulls", cardScript)
