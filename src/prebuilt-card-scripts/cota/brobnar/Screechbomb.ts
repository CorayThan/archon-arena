import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Omni: Sacrifice Screechbomb. Your opponent loses 2<A>.
    omni: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add omni code here
        }
    },
}
cardScripts.scripts.set("screechbomb", cardScript)