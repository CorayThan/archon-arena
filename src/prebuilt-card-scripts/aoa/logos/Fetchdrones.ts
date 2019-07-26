import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Action: Discard the top 2 cards of your deck. For each Logos card discarded this way, a friendly creature captures 2A.
    action: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add action code here
        }
    },
}
cardScripts.scripts.set("fetchdrones", cardScript)