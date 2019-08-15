import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: If your opponent has more A than you, gain 1A for each key your opponent has forged.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            if (activePlayerState(state).amber < inactivePlayerState(state).amber) {
                modifyAmber(activePlayerState(state), inactivePlayerState(state).keys)
            }
        }
    }
}
cardScripts.scripts.set("furtive-investors", cardScript)