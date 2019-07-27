import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Alpha. (You can only play this card before doing anything else this step.) Play: Deal 2D to an enemy creature. If that creature is destroyed by this effect, archive Sucker Punch.
    amber: () => 1,
    alpha: () => true,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add onPlay code here
        }
    },
}
cardScripts.scripts.set("sucker-punch", cardScript)