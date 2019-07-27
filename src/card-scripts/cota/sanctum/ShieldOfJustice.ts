import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Play: For the remainder of the turn, each friendly creature cannot be dealt damage.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add onPlay code here
            //TODO no damage during turn
        }
    }
}

cardScripts.scripts.set("shield-of-justice", cardScript)