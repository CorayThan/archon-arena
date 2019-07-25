import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, drawCards, revealCards } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: Reveal any number of Mars cards from your hand. For each card revealed this way, draw 1 card.
    //TODO this doesn't let you select the number of cards to reveal.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            const revealedCards = activePlayerState(state).hand.filter(x => x.backingCard.house === House.Mars)
            revealCards(state, revealedCards)
            drawCards(activePlayerState(state), revealedCards.length)
        }
    }
}

cardScripts.scripts.set("battle-fleet", cardScript)