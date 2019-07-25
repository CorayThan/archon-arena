import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Omni: Reveal a Mars creature from your hand. If you do, archive it.
    omni: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add omni code here
        }
    },
}
cardScripts.scripts.set("incubation-chamber", cardScript)