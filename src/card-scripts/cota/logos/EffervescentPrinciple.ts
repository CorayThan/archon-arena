import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState } from "../../ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        perform: (state: GameState) => {
            const ownState = activePlayerState(state) as PlayerState
            ownState.amber = Math.ceil(ownState.amber / 2)
            ownState.chains += 1

            const opponentState = inactivePlayerState(state) as PlayerState
            opponentState.amber = Math.ceil(opponentState.amber / 2)
        }
    }
}

cardScripts.scripts.set("effervescent-principle", cardScript)
