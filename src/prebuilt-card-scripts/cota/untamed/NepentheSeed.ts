import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Omni: Sacrifice Nepenthe Seed. Return a card from your discard pile to your hand.
    omni: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add omni code here
        }
    },
}
cardScripts.scripts.set("nepenthe-seed", cardScript)