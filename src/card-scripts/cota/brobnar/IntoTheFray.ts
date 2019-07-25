import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    runAfterAnyActionThisTurn: {
        perform: (state: GameState, config: CardActionConfig) => {
            //TODO if action === fight
        }
    }
}

cardScripts.scripts.set("into-the-fray", cardScript)
