import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, isFlank, putInArchives } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Reap: If Glyxl Proliferator is on a flank, archive a Mars card from your discard pile.
    power: () => 3,
    reap: {
        validTargets: (state: GameState) => activePlayerState(state).discard,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            if (isFlank(state, config.thisCard as Creature)) {
                putInArchives(state, config.targets, true)
            }
        }
    }
}

cardScripts.scripts.set("glyxl-proliferator", cardScript)