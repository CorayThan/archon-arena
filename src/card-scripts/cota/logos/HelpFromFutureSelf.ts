import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, putInDeck, putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Search your deck and discard pile for a Timetraveller, reveal it, and put it into your hand. Shuffle your discard pile into your deck.
    amber: () => 1,
    onPlay: {
        validTargets: (state: GameState) => {
            const card = activePlayerState(state).discard.concat(activePlayerState(state).library)
                .find(x => x.backingCard.cardTitle === "Timetraveller")
            if (card) return [card]
            else return []
        },
        numberOfTargets: () => 1,
        upToTargets: () => true,
        perform: (state: GameState, config: CardActionConfig) => {
            putInHand(state, config.targets)
            putInDeck(state, activePlayerState(state).discard)
        }
    }
}
cardScripts.scripts.set("help-from-future-self", cardScript)