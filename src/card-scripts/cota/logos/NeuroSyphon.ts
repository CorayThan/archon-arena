import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, drawCards, inactivePlayerState, steal } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: If your opponent has more <A> than you, steal 1<A> and draw a card.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            if (activePlayerState(state).amber < inactivePlayerState(state).amber) {
                steal(state, 1)
                drawCards(activePlayerState(state), 1)
            }
        }
    }
}
cardScripts.scripts.set("neuro-syphon", cardScript)