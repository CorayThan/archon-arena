import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, drawCards, putInDeck } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Draw 2 cards.  Action: Shuffle Timetraveller into your deck.
    amber: () => 1,
    power: () => 2,
    onPlay: {
        perform: (state: GameState) => {
            drawCards(activePlayerState(state), 2)
        }
    },
    action: {
        perform: (state: GameState, config: CardActionConfig) => {
            putInDeck(state, [config.thisCard])
        }
    }
}
cardScripts.scripts.set("timetraveller", cardScript)