import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, getCardsWithTrait, putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Return each Horseman creature from your discard pile to your hand.
    power: () => 5,
    onPlay: {
        perform: (state: GameState) => {
            const horseMen = getCardsWithTrait(activePlayerState(state).discard, "Horseman")
            putInHand(state, horseMen)
        }
    }
}

cardScripts.scripts.set("horseman-of-death", cardScript)