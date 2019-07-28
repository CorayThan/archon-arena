import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyCreatures, putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Put an enemy creature into your opponent’s archives.
    amber: () => 1,
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            putInArchives(state, config.targets, false)
        }
    }
}
cardScripts.scripts.set("banish", cardScript)