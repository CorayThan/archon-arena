import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyArtifacts, useArtifact } from "../../ScriptUtils"
import { Artifact } from "../../../shared/gamestate/Artifact"

const cardScript: CardScript = {
    // Play: Use an opponent's artifact as if it were yours.
    amber: () => 1,
    onPlay: {
        validTargets: enemyArtifacts,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            useArtifact(state, config.targets as Artifact[])
        }
    }
}
cardScripts.scripts.set("remote-access", cardScript)