import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, destroyCard } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 3,
    skirmish: () => true,
    onPlay: {
        perform: (state: GameState) => {
            const opponentState = inactivePlayerState(state) as PlayerState
            const ownState = activePlayerState(state) as PlayerState

        
            opponentState.amber += 1
                
                
            
        }
    },
    destroyed: {
        perform: (state: GameState) => {
        const opponentState = inactivePlayerState(state) as PlayerState
        const ownState = activePlayerState(state) as PlayerState

        ownState.amber += 3
        opponentState.amber -= 3
        }
    }
}

cardScripts.scripts.set("brend-the-fanatic", cardScript)