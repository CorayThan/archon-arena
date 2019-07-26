import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Omni: Sacrifice Lifeward. Your opponent cannot play creatures on their next turn.
    amber: () => 1,
    omni: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add omni code here
        }
    },
}
cardScripts.scripts.set("lifeward", cardScript)