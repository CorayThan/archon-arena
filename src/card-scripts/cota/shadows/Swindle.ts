import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    alpha: () => true,
    omega: () => true,
    onPlay: {
        perform: (state: GameState) => {
            const opponentState = inactivePlayerState(state) as PlayerState
            if (opponentState.amber === 1) {
                opponentState.amber -= 1
                const ownState = activePlayerState(state) as PlayerState
                ownState.amber += 1
            }
        }
    }
}

cardScripts.scripts.set("swindle", cardScript)
