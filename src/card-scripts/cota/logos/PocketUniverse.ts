import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, modifyAmber } from "../../ScriptUtils"
import { Artifact } from "../../../shared/gamestate/Artifact"

const cardScript: CardScript = {
    // You may spend <A> on Pocket Universe when forging keys. 
    // Action: Move 1<A> from your pool to Pocket Universe.
    //TODO Spend these amber tokens when forging
    action: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (activePlayerState(state).amber > 0) {
                (config.thisCard as Artifact).tokens.amber += 1
                modifyAmber(activePlayerState(state), -1)
            }
        }
    }
}
cardScripts.scripts.set("pocket-universe", cardScript)