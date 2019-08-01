import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, shuffleDeck } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Swap your deck and your discard pile. Then, shuffle your deck.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            const library = activePlayerState(state).library
            activePlayerState(state).library = activePlayerState(state).discard
            activePlayerState(state).discard = library
            shuffleDeck(activePlayerState(state))
        }
    }
}
cardScripts.scripts.set("reverse-time", cardScript)