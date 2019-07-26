import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { inactivePlayerState, steal } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: If your opponent has 4<A> or more, steal 1<A>.
    power: () => 5,
    onPlay: {
        perform: (state: GameState) => {
            if (inactivePlayerState(state).amber >= 4) {
                steal(state, 1)
            }
        }
    }
}
cardScripts.scripts.set("shooler", cardScript)