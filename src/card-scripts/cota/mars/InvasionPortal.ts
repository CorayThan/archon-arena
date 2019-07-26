import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, discardCards, putInHand } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Action: Discard cards from the top of your deck until you discard a Mars creature or run out of cards.
    // If you discard a Mars creature this way, put it into your hand.
    action: {
        perform: (state: GameState) => {
            let stop = false
            while (!stop || 0 >= activePlayerState(state).library.length) {
                const card = activePlayerState(state).library[0]
                activePlayerState(state).library = activePlayerState(state).library.slice(1)
                if (card.backingCard.house === House.Mars && card.backingCard.cardType === "Creature") {
                    putInHand(state, [card])
                    stop = true
                } else discardCards(state, [card])
            }
        }
    }
}

cardScripts.scripts.set("invasion-portal", cardScript)