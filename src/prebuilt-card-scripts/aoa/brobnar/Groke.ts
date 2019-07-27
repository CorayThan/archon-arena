import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Fight: Your opponent loses 1A.
    power: () => 5,
    fight: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add fight code here
        }
    },
}
cardScripts.scripts.set("groke", cardScript)