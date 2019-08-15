import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { inactivePlayerState, steal } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Steal 1A. If your opponent has 7A or more, steal 2A instead.
    power: () => 2,
    onPlay: {
        perform: (state: GameState) => {
            if (inactivePlayerState(state).amber >= 7) {
                steal(state, 2)
            } else steal(state, 1)
        }
    }
}
cardScripts.scripts.set("ronnie-wristclocks", cardScript)