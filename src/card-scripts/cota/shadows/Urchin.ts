import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            const opponentState = inactivePlayerState(state) as PlayerState
            const ownState = activePlayerState(state) as PlayerState

            ownState.amber += 1
            opponentState.amber -= 1
                
                
            
        }
    }
}

cardScripts.scripts.set("urchin", cardScript)