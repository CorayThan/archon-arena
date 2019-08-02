import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, gainChains, inactivePlayerState } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Each player loses half their <A> (rounding down the loss). Gain 1 chain.
    onPlay: {
        perform: (state: GameState) => {
            const ownState = activePlayerState(state) as PlayerState
            ownState.amber = Math.ceil(ownState.amber / 2)
            gainChains(ownState, 1)

            const opponentState = inactivePlayerState(state) as PlayerState
            opponentState.amber = Math.ceil(opponentState.amber / 2)
        }
    }
}

cardScripts.scripts.set("effervescent-principle", cardScript)
