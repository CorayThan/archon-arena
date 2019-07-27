import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allNonFlankCreatures, destroyCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Destroy a creature that is not on a flank.
    onPlay: {
        validTargets: (state: GameState) => allNonFlankCreatures(state),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            destroyCards(state, config.targets)
        }
    }
}
cardScripts.scripts.set("hand-of-dis", cardScript)