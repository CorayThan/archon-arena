import {cardScripts} from "../../types/CardScripts"
import {CardScript} from "../../types/CardScript"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState } from "../../types/ScriptUtils"
const cardScript: CardScript = {
    power: () => 5,
    action: {
        perform: (state: GameState) => {
            const opponentState = inactivePlayerState(state) as PlayerState
            const ownState = activePlayerState(state) as PlayerState
            opponentState.amber -= 1
            ownState.amber += 1
            
        }


    },


}

cardScripts.scripts.set("yantzee-gang", cardScript)