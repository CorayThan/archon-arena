import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allArtifacts, destroyCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Omni: Sacrifice Gorm of Omm. Destroy an artifact.
    omni: {
        validTargets: (state: GameState, config: CardActionConfig) => allArtifacts(state).filter(x => x.id !== config.thisCard.id),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            destroyCards(state, config.targets.concat(config.thisCard))
        }
    }
}

cardScripts.scripts.set("gorm-of-omm", cardScript)