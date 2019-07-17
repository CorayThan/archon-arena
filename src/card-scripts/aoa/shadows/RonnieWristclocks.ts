import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 2,
    onPlay: {
        perform: (state: GameState) => {
            
            const opponentState = inactivePlayerState(state) as PlayerState
            const ownState = activePlayerState(state) as PlayerState
            if (opponentState.amber >= 7){
                ownState.amber += 2
                opponentState.amber -= 2
            }
            else{
            ownState.amber += 1
            opponentState.amber -= 1
                
            }
            
        }
    }
}

cardScripts.scripts.set("umbra", cardScript)