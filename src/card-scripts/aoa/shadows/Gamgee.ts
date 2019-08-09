import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, steal } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) Reap: If your opponent has more A than you, steal 1A.
    power: () => 2,
    elusive: () => true,
    reap: {
        perform: (state: GameState) => {
            if (activePlayerState(state).amber < inactivePlayerState(state).amber) {
                steal(state, 1)
            }
        }
    }
}
cardScripts.scripts.set("gamgee", cardScript)