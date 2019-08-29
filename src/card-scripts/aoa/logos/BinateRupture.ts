import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allPlayerStates, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Alpha. (You can only play this card before doing anything else this step.) Play: Each player gains A equal to the A in their pool.
    alpha: () => true,
    onPlay: {
        perform: (state: GameState) => {
            allPlayerStates(state).forEach(playerState => modifyAmber(playerState, playerState.amber))
        }
    }
}
cardScripts.scripts.set("binate-rupture", cardScript)