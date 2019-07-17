import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, destroyCard } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    
    onPlay: {
        perform: (state: GameState) => {
            //Sacrifice Guard Disguise
            const opponentState = inactivePlayerState(state) as PlayerState
            const ownState = activePlayerState(state) as PlayerState
            if (opponentState.amber <= 1) {
                
                
                ownState.amber += opponentState.amber
                opponentState.amber = 0
            }
        }
    }
}

cardScripts.scripts.set("ghostly-hand", cardScript)