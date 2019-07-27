import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, drawHand, inactivePlayerState } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Each player discards their hand, then refills their hand as if it were the end of their turn.
    onPlay: {
        perform: (state: GameState) => {
            activePlayerState(state).discard.concat(activePlayerState(state).hand)
            activePlayerState(state).hand = []
            drawHand(activePlayerState(state))

            inactivePlayerState(state).discard.concat(inactivePlayerState(state).hand)
            inactivePlayerState(state).hand = []
            drawHand(inactivePlayerState(state))
        }
    }
}

cardScripts.scripts.set("punctuated-equilibrium", cardScript)