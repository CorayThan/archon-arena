import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, modifyAmber } from "../../ScriptUtils"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Action: For the remainder of the turn, gain 1<A> each time a creature reaps.
    onAnyReap: {
        perform: (state: GameState) => {
            modifyAmber(activePlayerState(state), 1)
        }
    }
}

cardScripts.scripts.set("crystal-hive", cardScript)