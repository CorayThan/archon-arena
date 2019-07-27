import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Reap: Return each copy of Ortannu’s Binding from your discard pile to your hand. For each one returned this way, deal 2D to a creature, with 2D splash.
    power: () => 7,
    reap: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add reap code here
        }
    },
}
cardScripts.scripts.set("ortannu-the-chained", cardScript)