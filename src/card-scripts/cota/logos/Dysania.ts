import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, discardCards, inactivePlayerState, modifyAmber, putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Your opponent discards each of their archived cards. You gain 1<A> for each card discarded this way.
    power: () => 4,
    onPlay: {
        perform: (state: GameState) => {
            const toDiscard = inactivePlayerState(state).archives.filter(x => x.ownerId === inactivePlayerState(state).player.id)
            const toHand = inactivePlayerState(state).archives.filter(x => x.ownerId === activePlayerState(state).player.id)
            discardCards(state, toDiscard)
            putInHand(state, toHand)
            modifyAmber(activePlayerState(state), toDiscard.length)
        }
    }
}
cardScripts.scripts.set("dysania", cardScript)