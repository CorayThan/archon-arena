import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { captureAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Capture 3<A>.
    power: () => 4,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            captureAmber(state, config.thisCard as Creature, 3)
        }
    }
}
cardScripts.scripts.set("charette", cardScript)