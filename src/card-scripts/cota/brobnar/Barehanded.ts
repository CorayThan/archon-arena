import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allArtifacts, putOnTopOfDeck } from "../../ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: allArtifacts,
        numberOfTargets: (state: GameState) => {
            return allArtifacts(state).length
        },
        perform: (state: GameState, config: CardActionConfig) => {
            putOnTopOfDeck(state, config.targets)
        },
    }
}

cardScripts.scripts.set("barehanded", cardScript)
