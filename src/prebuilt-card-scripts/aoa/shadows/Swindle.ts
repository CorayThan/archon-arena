import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Alpha. (You can only play this card before doing anything else this step.) Omega. (After you play this card, end this step.) Play: Steal 3A.
    alpha: () => true,
    omega: () => true,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add onPlay code here
        }
    },
}
cardScripts.scripts.set("swindle", cardScript)