import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Alpha. (You can only play this card before doing anything else this step.) Play: Each player gains A equal to the A in their pool.
    alpha: () => true,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add onPlay code here
        }
    },
}
cardScripts.scripts.set("binate-rupture", cardScript)