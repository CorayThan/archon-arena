import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, discardCards, drawCards, inactivePlayerState } from "../../ScriptUtils"
import { shuffle } from "lodash"

const cardScript: CardScript = {
    // Play: If you have more A than your opponent, they discard a random card from their hand and you draw a card.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            if (activePlayerState(state).amber > inactivePlayerState(state).amber) {
                discardCards(state, [shuffle(inactivePlayerState(state).hand)[0]])
                drawCards(activePlayerState(state), 1)
            }
        }
    }
}
cardScripts.scripts.set("perplexing-sophistry", cardScript)