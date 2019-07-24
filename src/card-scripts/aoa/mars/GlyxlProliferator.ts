import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, isFlank, putInArchives } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Reap: If Glyxl Proliferator is on a flank, archive a Mars card from your discard pile.
    power: () => 3,
    reap: {
        validTargets: (state) => activePlayerState(state).discard,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            if (isFlank(state, config.thisCard as Creature)) {
                putInArchives(state, config.targets, true)
            }
        }
    }
}

cardScripts.scripts.set("glyxl-proliferator", cardScript)