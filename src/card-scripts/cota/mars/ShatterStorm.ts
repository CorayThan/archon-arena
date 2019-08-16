import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Lose all your <A>. Then, your opponent loses triple the amount of <A> you lost this way.
    onPlay: {
        perform: (state: GameState) => {
            const amberLost = activePlayerState(state).amber
            modifyAmber(activePlayerState(state), -amberLost)
            modifyAmber(inactivePlayerState(state), -amberLost * 3)
        }
    }
}

cardScripts.scripts.set("shatter-storm", cardScript)