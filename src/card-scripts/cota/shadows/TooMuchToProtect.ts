import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            const opponentState = inactivePlayerState(state) as PlayerState
            const ownState = activePlayerState(state) as PlayerState
            if (opponentState.amber >= 6) {
                ownState.amber += opponentState.amber -6
                opponentState.amber -= opponentState.amber -6
                
                
            }
        }
    }
}

cardScripts.scripts.set("too-much-too-protect", cardScript)