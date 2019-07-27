import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allPlayerStates } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Each player with 6<A> or more is reduced to 5<A>.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            allPlayerStates(state).forEach(player => {
                if (player.amber >= 6) player.amber = 5
            })
        }
    }
}

cardScripts.scripts.set("doorstep-to-heaven", cardScript)