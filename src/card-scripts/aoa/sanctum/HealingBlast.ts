import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, allCreatures, modifyAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Fully heal a creature. If you healed 4 or more damage this way, gain 2A.
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            if ((config.targets[0] as Creature).tokens.damage >= 4) {
                modifyAmber(activePlayerState(state), 2)
            }
            (config.targets[0] as Creature).tokens.damage = 0
        }
    }
}

cardScripts.scripts.set("healing-blast", cardScript)