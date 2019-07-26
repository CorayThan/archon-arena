import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, putInDeck, shuffleDeck } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Action: Shuffle your hand and discard pile into your deck.
    action: {
        perform: (state: GameState) => {
            const playerState = activePlayerState(state)
            putInDeck(state, playerState.discard.concat(playerState.hand))
            shuffleDeck(playerState)
        }
    }
}
cardScripts.scripts.set("screaming-cave", cardScript)