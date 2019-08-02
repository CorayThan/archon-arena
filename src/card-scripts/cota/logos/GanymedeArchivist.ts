import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Reap: Archive a card.
    power: () => 3,
    reap: {
        validTargets: (state: GameState) => activePlayerState(state).hand,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            putInArchives(state, config.targets, true)
        }
    }
}
cardScripts.scripts.set("ganymede-archivist", cardScript)