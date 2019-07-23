import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { captureAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Reap: Capture 1<A>.
    power: () => 4,
    armor: () => 2,
    reap: {
        perform: (state, config) => {
            captureAmber(state, config.thisCard as Creature, 1)
        }
    }
}

cardScripts.scripts.set("sequis", cardScript)