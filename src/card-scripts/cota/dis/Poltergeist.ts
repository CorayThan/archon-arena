import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allArtifacts, destroyCards, useArtifact } from "../../ScriptUtils"
import { Artifact } from "../../../shared/gamestate/Artifact"

const cardScript: CardScript = {
    // Play: Use an artifact controlled by any player as if it were yours. Destroy that artifact.
    amber: () => 1,
    onPlay: {
        validTargets: allArtifacts,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            useArtifact(config.targets as Artifact[])
            destroyCards(state, config.targets)
        }
    }
}
cardScripts.scripts.set("poltergeist", cardScript)