import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { captureAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Fight: Capture 1<A>.
    power: () => 6,
    armor: () => 2,
    fight: {
        perform: (state, config) => {
            captureAmber(state, config.thisCard as Creature, 1)
        }
    }
}

cardScripts.scripts.set("champion-tabris", cardScript)