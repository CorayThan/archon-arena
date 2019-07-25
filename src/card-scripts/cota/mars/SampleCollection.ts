import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyCreatures, putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Put an enemy creature into your archives for each key your opponent has forged.
    // If any of these creatures leave your archives, they are put into their owner’s hand instead.
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            putInArchives(state, config.targets, true)
        }
    }
}

cardScripts.scripts.set("sample-collection", cardScript)