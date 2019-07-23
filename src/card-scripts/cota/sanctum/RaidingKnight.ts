import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { captureAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Capture 1<A>.
    power: () => 4,
    armor: () => 2,
    onPlay: {
        perform: (state, config) => {
            captureAmber(state, config.thisCard as Creature, 1)
        }
    }
}

cardScripts.scripts.set("raiding-knight", cardScript)