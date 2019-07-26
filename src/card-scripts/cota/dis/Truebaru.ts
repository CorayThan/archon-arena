import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // You must lose 3<A> in order to play Truebaru.  
    // Taunt. (This creature’s neighbors cannot be attacked unless they have taunt.)
    // Destroyed: Gain 5<A>.
    power: () => 7,
    taunt: () => true,
    canBePlayed: (state: GameState) => {
        return activePlayerState(state).amber >= 3
    },
    onPlay: {
        perform: (state: GameState) => {
            modifyAmber(activePlayerState(state), -3)
        }
    },
    destroyed: {
        perform: (state: GameState) => {
            modifyAmber(activePlayerState(state), 5)
        }
    }
}
cardScripts.scripts.set("truebaru", cardScript)