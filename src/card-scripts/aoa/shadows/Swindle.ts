import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { steal } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Alpha. (You can only play this card before doing anything else this step.) Omega. (After you play this card, end this step.) Play: Steal 3A.
    alpha: () => true,
    omega: () => true,
    onPlay: {
        perform: (state: GameState) => {
            steal(state, 3)
        }
    }
}
cardScripts.scripts.set("swindle", cardScript)