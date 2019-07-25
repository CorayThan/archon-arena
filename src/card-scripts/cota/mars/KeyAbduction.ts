import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, forgeKey, friendlyCreatures, putInHand } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: Return each Mars creature to its owner's hand. Then, you may forge a key at +9<A> current cost, reduced by 1<A> for each card in your hand.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            const targets = friendlyCreatures(state)
                .filter(x => x.backingCard.house === House.Mars)
            putInHand(state, targets)
            activePlayerState(state).keyCost = activePlayerState(state).keyCost + 9 - activePlayerState(state).hand.length
            forgeKey(activePlayerState(state))
        }
    }
}

cardScripts.scripts.set("key-abduction", cardScript)