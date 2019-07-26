import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Action: Archive a card.
    action: {
        validTargets: (state: GameState) => activePlayerState(state).hand,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            putInArchives(state, config.targets, true)
        }
    }
}
cardScripts.scripts.set("library-of-the-damned", cardScript)