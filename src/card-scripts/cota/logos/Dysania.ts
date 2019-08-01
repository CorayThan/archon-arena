import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, discardCards, inactivePlayerState, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Your opponent discards each of their archived cards. You gain 1<A> for each card discarded this way.
    power: () => 4,
    onPlay: {
        perform: (state: GameState) => {
            const targets = inactivePlayerState(state).archives
            discardCards(state, targets)
            modifyAmber(activePlayerState(state), targets.length)
        }
    }
}
cardScripts.scripts.set("dysania", cardScript)