import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Fight/Reap: Purge a creature from a discard pile. If you do, put a +1 power counter on Eater of the Dead.
    power: () => 4,
    reap: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add reap code here
        }
    },
    fight: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add fight code here
        }
    },
}
cardScripts.scripts.set("eater-of-the-dead", cardScript)