import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { captureAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Capture 3A. Reap: Discard 1A from Aubade the Grim.
    power: () => 4,
    armor: () => 1,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            captureAmber(state, config.thisCard as Creature, 3)
        }
    },
    reap: {
        perform: (state: GameState, config: CardActionConfig) => {
            if ((config.thisCard as Creature).tokens.amber > 0) (config.thisCard as Creature).tokens.amber--
        }
    }
}

cardScripts.scripts.set("aubade-the-grim", cardScript)