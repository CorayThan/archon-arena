import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, destroyCards, friendlyCreatures, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Destroy any number of friendly creatures. Gain 1A for each creature destroyed this way.
    amber: () => 1,
    onPlay: {
        validTargets: friendlyCreatures,
        numberOfTargets: (state: GameState) => friendlyCreatures(state).length,
        upToTargets: () => true,
        perform: (state: GameState, config: CardActionConfig) => {
            destroyCards(state, config.targets)
            modifyAmber(activePlayerState(state), config.targets.length)
        }
    }
}

cardScripts.scripts.set("martyrs-end", cardScript)