import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Archive a card.
    amber: () => 1,
    onPlay: {
        validTargets: (state: GameState) => activePlayerState(state).hand,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            putInArchives(state, config.targets, true)
        }
    }
}
cardScripts.scripts.set("labwork", cardScript)