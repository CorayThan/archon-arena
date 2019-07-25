import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Omega. (After you play this card,
    // end this step.)
    // Play: Return a card from your discard pile to your hand.
    amber: () => 1,
    omega: () => true,
    onPlay: {
        validTargets: (state) => activePlayerState(state).discard,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            putInHand(state, config.targets)
        }
    }
}

cardScripts.scripts.set("gravid-cycle", cardScript)