import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, drawCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Action: Draw a card.
    action: {
        perform: (state: GameState) => {
            drawCards(activePlayerState(state), 1)
        }
    }
}
cardScripts.scripts.set("library-of-babble", cardScript)