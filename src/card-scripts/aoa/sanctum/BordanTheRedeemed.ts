import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {captureAmber} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) Action: Capture 2A.
    power: () => 3,
    elusive: () => true,
    action: {
        perform: (state, config) => {
            captureAmber(state, config.thisCard as Creature, 2)
        }
    }
}

cardScripts.scripts.set("bordan-the-redeemed", cardScript)