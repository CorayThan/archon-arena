import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Play: For the remainder of the turn, each time a friendly creature fights, it captures 1<A>.
    amber: () => 1,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        //TODO on fight, capture
    }

}

cardScripts.scripts.set("take-hostages", cardScript)