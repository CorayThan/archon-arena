import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Action: Archive a card.
    action: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add action code here
        }
    },
}
cardScripts.scripts.set("library-of-the-damned", cardScript)