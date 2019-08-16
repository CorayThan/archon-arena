import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allPlayerStates, discardCards, drawHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Each player discards their hand, then refills their hand as if it were the end of their turn.
    onPlay: {
        perform: (state: GameState) => {
            allPlayerStates(state).forEach(playerState => {
                discardCards(state, playerState.hand)
                drawHand(playerState)
            })

        }
    }
}

cardScripts.scripts.set("punctuated-equilibrium", cardScript)