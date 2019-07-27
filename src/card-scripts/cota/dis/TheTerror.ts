import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: If your opponent has no <A>, gain 2<A>.
    power: () => 5,
    onPlay: {
        perform: (state: GameState) => {
            if (inactivePlayerState(state).amber === 0) {
                modifyAmber(activePlayerState(state), 2)
            }
        }
    }
}
cardScripts.scripts.set("the-terror", cardScript)