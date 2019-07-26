import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { steal } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Action: Steal 1<A>.
    power: () => 5,
    action: {
        perform: (state: GameState) => {
            steal(state, 1)
        }
    }
}
cardScripts.scripts.set("pit-demon", cardScript)