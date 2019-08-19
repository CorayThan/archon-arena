import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { inactivePlayerState, steal } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Steal 2A if your opponent has 8A or more.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            if (inactivePlayerState(state).amber >= 8) {
                steal(state, 2)
            }
        }
    }
}
cardScripts.scripts.set("cutthroat-research", cardScript)