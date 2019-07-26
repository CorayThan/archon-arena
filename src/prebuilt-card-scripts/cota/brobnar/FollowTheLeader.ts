import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Play: For the remainder of the turn, each friendly creature may fight.
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add onPlay code here
        }
    },
}
cardScripts.scripts.set("follow-the-leader", cardScript)