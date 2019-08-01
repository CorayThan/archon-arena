import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyCreatures, putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) 
    // Reap: Put an enemy creature into your archives. If that creature leaves your archives, it is put into its owner’s hand instead.
    power: () => 2,
    elusive: () => true,
    reap: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            putInArchives(state, config.targets, true)
        }
    }
}

cardScripts.scripts.set("uxlyx-the-zookeeper", cardScript)