import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, enemyArtifacts, friendlyArtifacts, inactivePlayerState, steal } from "../../ScriptUtils"
import { Artifact } from "../../../shared/gamestate/Artifact"

const cardScript: CardScript = {
    // Reap: Give control of a friendly artifact to your opponent. If you do, they must give you 2A.
    power: () => 2,
    reap: {
        validTargets: friendlyArtifacts,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            inactivePlayerState(state).artifacts = enemyArtifacts(state).concat(config.targets as Artifact[])
            const index = friendlyArtifacts(state).findIndex(x => (x as Artifact).id === (config.targets[0] as Artifact).id)
            inactivePlayerState(state).artifacts = enemyArtifacts(state).concat(config.targets as Artifact[])
            activePlayerState(state).artifacts.splice(index, 1)
            steal(state, 2)
        }
    }
}

cardScripts.scripts.set("anahita-the-trader", cardScript)