import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {captureAmber, friendlyCreatures} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Choose a friendly creature to capture 2<A>.
    amber: () => 1,
    onPlay: {
        validTargets: friendlyCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            captureAmber(state, config.thisCard as Creature, 2)
        }
    }
}

cardScripts.scripts.set("terms-of-redress", cardScript)