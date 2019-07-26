import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Action: Steal 1A.
    power: () => 5,
    action: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add action code here
        }
    },
}
cardScripts.scripts.set("yantzee-gang", cardScript)