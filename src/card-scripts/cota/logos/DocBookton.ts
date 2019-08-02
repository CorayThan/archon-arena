import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, drawCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Reap: Draw a card.
    power: () => 5,
    reap: {
        perform: (state: GameState) => {
            drawCards(activePlayerState(state), 1)
        }
    }
}
cardScripts.scripts.set("doc-bookton", cardScript)