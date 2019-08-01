import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, putInDeck, putInHand } from "../../ScriptUtils"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Play: Search your deck and discard pile for a Timetraveller, reveal it, and put it into your hand. Shuffle your discard pile into your deck.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            const discard = activePlayerState(state).discard
            const library = activePlayerState(state).library
            const target = library.concat(discard).find(x => x.backingCard.cardTitle === "Timetraveller")
            putInHand(state, [target] as CardInGame[])
            putInDeck(state, activePlayerState(state).discard)
        }
    }
}
cardScripts.scripts.set("help-from-future-self", cardScript)